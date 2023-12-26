package se.moevm.river_routes.osm.services.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import se.moevm.river_routes.osm.client.GeographicalNamesConfig;
import se.moevm.river_routes.osm.client.OSMFeignClient;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.repository.PierRepository;
import se.moevm.river_routes.osm.repository.SightRepository;
import se.moevm.river_routes.osm.repository.WaterRepository;
import se.moevm.river_routes.osm.services.OSMPumpService;
import se.moevm.river_routes.osm.services.ParseService;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Slf4j
public class OSMPumpServiceImpl implements OSMPumpService {
    private final OSMFeignClient feignClient;
    private final WaterRepository waterRepository;
    private final SightRepository sightRepository;
    private final PierRepository pierRepository;
    private final GeographicalNamesConfig geographicalNamesConfig;

    private static final double WATER_DISTANCE_THRESHOLD = 0.001;
    private static final double PIER_DISTANCE_THRESHOLD = 0.001;
    private static final double SIGHT_OBSERVATION_THRESHOLD = 0.002;

    private static final double MIN_LATITUDE = 59.94;
    private static final double MAX_LATITUDE = 59.95;
    private static final double MIN_LONGITUDE = 30.32;
    private static final double MAX_LONGITUDE = 30.34;

    private final ParseService parseService;

    @Override
    public boolean pumpAllData() {
        try {
            sightRepository.deleteAll();
            waterRepository.deleteAll();
            pierRepository.deleteAll();

            List<WaterNode> waterNodes =  parseService.getAllWater();
            log.info("found {} water nodes", waterNodes.size());

            List<PierNode> pierNodes = parseService.getAllPierces();
            log.info("found {} pier nodes", pierNodes.size());

            List<SightNode> sightNodes = parseService.getAllSights();
            log.info("found {} sight nodes", sightNodes.size());

            log.info("saving...");
//            waterRepository.saveAll(waterNodes);
//            pierRepository.saveAll(pierNodes);
//            sightRepository.saveAll(sightNodes);
            log.info("saved");

            return true;
        } catch (Throwable e) {
            waterRepository.deleteAll();
            sightRepository.deleteAll();
            pierRepository.deleteAll();
            return false;
        }
    }

    private boolean isWithinRectangularArea(double lat, double lon) {
        return lat >= MIN_LATITUDE && lat <= MAX_LATITUDE && lon >= MIN_LONGITUDE && lon <= MAX_LONGITUDE;
    }

    private double distance(double x1, double y1, double x2, double y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    private List<WaterNode> getAllWater() {
        return geographicalNamesConfig.getRivers().stream()
                .flatMap(river -> feignClient.getRiverNodes("Нева").getElements().stream())
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .filter(x -> isWithinRectangularArea(x.getLat(), x.getLon()))
                .distinct()
                .map(x -> WaterNode.builder()
                        .lat(x.getLat())
                        .lon(x.getLon())
                        .build()
                )
                .toList();
    }

    private List<PierNode> getAllPierces() {
        return feignClient.getPierNodes().getElements().stream().filter(Objects::nonNull)
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .filter(x -> x.getGeometry() != null)
                .flatMap(x -> x.getGeometry().stream())
                .filter(x -> isWithinRectangularArea(x.getLat(), x.getLon()))
                .distinct()
                .map(x -> PierNode.builder()
                        .lat(x.getLat())
                        .lon(x.getLon())
                        .build()
                )
                .toList();
    }

    private List<SightNode> getAllSights() {
        return feignClient.getSightNodes().getElements().stream()
                .filter(x -> Objects.equals(x.getType(), "node"))
                .filter(x -> isWithinRectangularArea(x.getLat(), x.getLon()))
                .distinct()
                .map(x -> SightNode.builder()
                        .title(x.getTags().getName())
                        .lat(x.getLat())
                        .lon(x.getLon())
                        .updatedAt(OffsetDateTime.now())
                        .build()
                )
                .toList();
    }

    private void linkWaterNodes(List<WaterNode> waterNodes) {
        for (int i = 0; i < waterNodes.size(); i++) {
            var node1 = waterNodes.get(i);
            for (int j = i; j < waterNodes.size(); j++) {
                var node2 = waterNodes.get(j);
                if (i != j && distance(node1.getLat(), node1.getLon(),
                        node2.getLat(), node2.getLon()) <= WATER_DISTANCE_THRESHOLD) {
                    node1.addNeighbour(node2);
                    node2.addNeighbour(node1);
                }
            }
        }
    }

    private void linkPierWithWater(List<PierNode> pierNodes, List<WaterNode> waterNodes) {
        for (int i = 0; i < waterNodes.size(); i++) {
            var water = waterNodes.get(i);
            for (int j = 0; j < pierNodes.size(); j++) {
                var pier = pierNodes.get(j);

                if (i != j && distance(water.getLat(), water.getLon(),
                        pier.getLat(), pier.getLon()) <= PIER_DISTANCE_THRESHOLD) {
                    water.addPier(pier);
                }
            }
        }
    }

    private void linkSightWithWater(List<SightNode> sightNodes, List<WaterNode> waterNodes) {
        for (int i = 0; i < waterNodes.size(); i++) {
            var water = waterNodes.get(i);
            for (int j = 0; j < sightNodes.size(); j++) {

                var sight = sightNodes.get(j);

                if (i != j && distance(water.getLat(), water.getLon(),
                        sight.getLat(), sight.getLon()) <= SIGHT_OBSERVATION_THRESHOLD) {
                    water.addSight(sight);
                }
            }
        }
    }
}

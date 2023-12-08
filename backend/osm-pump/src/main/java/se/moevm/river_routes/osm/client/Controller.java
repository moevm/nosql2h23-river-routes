package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.repository.PierRepository;
import se.moevm.river_routes.osm.repository.SightRepository;
import se.moevm.river_routes.osm.repository.WaterRepository;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class Controller {

    private final OSMFeignClient feignClient;
    private final WaterRepository waterRepository;
    private final SightRepository sightRepository;
    private final PierRepository pierRepository;
    private final GeographicalNamesConfig geographicalNamesConfig;

    private static final double WATER_DISTANCE_THRESHOLD = 0.001;
    private static final double PIER_DISTANCE_THRESHOLD = 0.001;
    private static final double SIGHT_OBSERVATION_THRESHOLD = 0.002;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        waterRepository.deleteAll();
        sightRepository.deleteAll();
        pierRepository.deleteAll();

        List<WaterNode> waterNodes = getAllWater();
        log.info("found {} water nodes", waterNodes.size());
        linkWaterNodes(waterNodes);
        log.info("water nodes linked");

        List<PierNode> pierNodes = getAllPierces();
        log.info("found {} pier nodes", pierNodes.size());
        linkPierWithWater(pierNodes, waterNodes);
        log.info("pier nodes linked");

        List<SightNode> sightNodes = getAllSights();
        log.info("found {} sight nodes", sightNodes.size());
        linkSightWithWater(sightNodes, waterNodes);
        log.info("sight nodes linked");

        log.info("saving...");
        waterRepository.saveAll(waterNodes);
        pierRepository.saveAll(pierNodes);
        sightRepository.saveAll(sightNodes);
        log.info("saved");

        pierRepository.getPiers().forEach(x -> System.out.println(x.toString()));
    }

    double distance(double x1, double y1, double x2, double y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    List<WaterNode> getAllWater() {
        return geographicalNamesConfig.getRivers().stream()
                .flatMap(river -> feignClient.getRiverNodes(river).getElements().stream())
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .distinct()
                .map(x -> WaterNode.builder()
                        .lat(x.getLat())
                        .lon(x.getLon())
                        .build()
                )
                .toList();
    }

    List<PierNode> getAllPierces() {
        return feignClient.getPierNodes().getElements().stream()
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .distinct()
                .map(x -> PierNode.builder()
                        .lat(x.getLat())
                        .lon(x.getLon())
                        .build()
                )
                .toList();
    }

    List<SightNode> getAllSights() {
        return feignClient.getSightNodes().getElements().stream()
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .distinct()
                .map(x -> SightNode.builder()
                        .title("name")
                        .lat(x.getLat())
                        .lon(x.getLon())
                        .wikiLink("http://en.wikipedia.org/wiki/")
                        .updatedAt(OffsetDateTime.now())
                        .build()
                )
                .toList();
    }

    void linkWaterNodes(List<WaterNode> waterNodes) {
        for (int i = 0; i < waterNodes.size(); i++) {
            var node1 = waterNodes.get(i);
            for (int j = i; j < waterNodes.size(); j++) {
                var node2 = waterNodes.get(j);
                if (i != j && distance(node1.getLat(), node1.getLon(),
                        node2.getLat(), node2.getLon()) <= WATER_DISTANCE_THRESHOLD) {
                    if (node1.getNeighbours() == null) {
                        node1.setNeighbours(new ArrayList<>());
                    }
                    if (node2.getNeighbours() == null) {
                        node2.setNeighbours(new ArrayList<>());
                    }
                    node1.addNeighbour(node2);
                    node2.addNeighbour(node1);
                }
            }
        }
    }

    void linkPierWithWater(List<PierNode> pierNodes, List<WaterNode> waterNodes) {
        for (int i = 0; i < waterNodes.size(); i++) {
            var water = waterNodes.get(i);
            for (int j = 0; j < pierNodes.size(); j++) {
                var pier = pierNodes.get(j);
                if (pier.getNeighbours() == null) {
                    pier.setNeighbours(new ArrayList<>());
                }
                if (i != j && distance(water.getLat(), water.getLon(),
                        pier.getLat(), pier.getLon()) <= PIER_DISTANCE_THRESHOLD) {
                    water.addPier(pier);
                    pier.addNeighbour(water);
                }
            }
        }
    }

    void linkSightWithWater(List<SightNode> sightNodes, List<WaterNode> waterNodes) {

        for (int i = 0; i < waterNodes.size(); i++) {
            var water = waterNodes.get(i);
            for (int j = 0; j < sightNodes.size(); j++) {

                var sight = sightNodes.get(j);

                if (i != j && distance(water.getLat(), water.getLon(),
                        sight.getLat(), sight.getLon()) <= SIGHT_OBSERVATION_THRESHOLD) {

                    water.addSight(sight);
                    sight.addObservationFromWater(water);
                }
            }
        }
    }
}

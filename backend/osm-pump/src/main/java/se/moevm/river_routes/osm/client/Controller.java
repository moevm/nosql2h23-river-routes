package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.repository.PierRepository;
import se.moevm.river_routes.osm.repository.SightRepository;
import se.moevm.river_routes.osm.repository.WaterRepository;

import java.util.List;

@RestController
@AllArgsConstructor
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
    void schedule() { //todo single transaction
        System.out.println("!!!rivers: " + geographicalNamesConfig.getRivers());

        List<WaterNode> waterNodes = getAllWater();

        System.out.println(waterNodes);
        System.out.println("calculated size " + waterNodes.size());

        linkWaterNodes(waterNodes);

        List<PierNode> pierNodes = getAllPierces();
        linkPierWithWater(pierNodes, waterNodes);

        List<SightNode> sightNodes = getAllSights();
        linkSightWithWater(sightNodes, waterNodes);

        waterRepository.saveAll(waterNodes);
        pierRepository.saveAll(pierNodes);
        sightRepository.saveAll(sightNodes);
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
                .map(x -> new WaterNode(x.getLat(), x.getLon()))
                .toList();
    }

    List<PierNode> getAllPierces() {

        return feignClient.getPierNodes().getElements().stream()
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .distinct()
                .map(x -> new PierNode(x.getLat(), x.getLon()))
                .toList();
    }

    List<SightNode> getAllSights() {

        return feignClient.getSightNodes().getElements().stream()
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .distinct()
                .map(x -> new SightNode("stub", x.getLat(), x.getLon()))
                .toList();
    }

    void linkWaterNodes(List<WaterNode> waterNodes) {

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

    void linkPierWithWater(List<PierNode> pierNodes, List<WaterNode> waterNodes) {

        for (int i = 0; i < waterNodes.size(); i++) {
            var water = waterNodes.get(i);
            for (int j = 0; j < pierNodes.size(); j++) {

                var pier = pierNodes.get(j);

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

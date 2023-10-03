package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.repository.WaterRepository;

import java.util.List;

@RestController
@AllArgsConstructor
public class Controller {

    private final OSMFeignClient feignClient;
    private final WaterRepository waterRepository;
    private final GeographicalNamesConfig geographicalNamesConfig;

    private static final double DISTANCE = 0.001;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        System.out.println("dasdsdsads!!!");

        List<WaterNode> waterNodes = feignClient.getRiverNodes("Нева")
                .getElements().stream()
                .filter(x -> x.getMembers() != null)
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .distinct()
                .map(x -> new WaterNode(x.getLat(), x.getLon()))
                .toList();

        System.out.println(waterNodes);

        for (int i = 0; i < waterNodes.size(); i++) {
            var node1 = waterNodes.get(i);
            for (int j = i; j < waterNodes.size(); j++) {

                var node2 = waterNodes.get(j);

                if (i != j && distance(node1.getLat(), node1.getLon(), node2.getLat(), node2.getLon()) <= DISTANCE) {
                    node1.addNeighbour(node2);
                    node2.addNeighbour(node1);
                }
            }
        }

        System.out.println("calculated size " + waterNodes.size());

        waterRepository.saveAll(waterNodes);
    }

    double distance(double x1, double y1, double x2, double y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

}

package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.model.Location2D;

import java.util.List;

@RestController
@AllArgsConstructor
public class Controller {

    private final OSMFeignClient feignClient;
    private final GeographicalNamesConfig geographicalNamesConfig;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        System.out.println("dasdsdsads!!!");

        List<Location2D> locations = feignClient.getPierNodes()
                .getElements().stream()
                .flatMap(x -> x.getMembers().stream())
                .flatMap(x -> x.getGeometry().stream())
                .toList();



        System.out.println(locations);

    }
}

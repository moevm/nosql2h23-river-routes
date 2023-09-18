package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.model.OsmResponse;

@RestController
@AllArgsConstructor
public class Controller {

    private final OSMFeignClient feignClient;
    private final GeographicalNamesConfig geographicalNamesConfig;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        System.out.println("dasdsdsads!!!");

        String response = feignClient.getPierNodes();

        System.out.println(response);

    }
}

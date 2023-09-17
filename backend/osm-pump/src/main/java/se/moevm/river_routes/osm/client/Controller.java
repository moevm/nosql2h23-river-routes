package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.model.OsmResponse;

@RestController
@AllArgsConstructor
public class Controller {

    private final OSMFeignClient OSMFeignClient;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        System.out.println("dasdsdsads!!!");
        OsmResponse response = OSMFeignClient.getRiverNodes("Нева");

        System.out.println(response.toString());
    }
}

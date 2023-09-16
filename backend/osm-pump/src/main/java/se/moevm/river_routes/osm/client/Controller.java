package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class Controller {

    private final WaterFeignClient waterFeignClient;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        System.out.println("dasdsdsads!!!");
        String str = waterFeignClient.getWaterNodes();

        System.out.println(str);
    }
}

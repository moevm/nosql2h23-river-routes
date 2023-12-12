package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.services.OSMPumpService;

@RestController
@AllArgsConstructor
@Slf4j
public class Controller {
    private final OSMPumpService pumpService;

    @SneakyThrows
    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        pumpService.pumpAllData();
//        var rr = waterRepository.getPath();
//        System.out.println(rr);
    }

}

package se.moevm.river_routes.osm.service;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class HelloScheduler {

    private final SampleRepository sampleRepository;

    @Scheduled(initialDelay = 3000, fixedDelay = 120000)
    void schedule() {
        System.out.println("scheduled!!!");

        SampleNode node1 = new SampleNode("hi");

        sampleRepository.save(node1);

        sampleRepository.findById("hi").ifPresent(y -> System.out.println(y));
    }
}

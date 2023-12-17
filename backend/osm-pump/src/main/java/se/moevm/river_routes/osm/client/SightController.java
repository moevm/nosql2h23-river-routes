package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import se.moevm.river_routes.osm.repository.SightRepository;
import se.moevm.river_routes.osm.repository.WaterRepository;
import se.moevm.river_routes.osm.services.OSMPumpService;

import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@Slf4j
public class SightController {

    private final SightRepository sightRepository;
    private final WaterRepository waterRepository;

    private final OSMPumpService pumpService;

    @GetMapping("/pump")
    public ResponseEntity<?> getPumpResult() {
        log.info("try to pump");
        return ResponseEntity.ok(pumpService.pumpAllData());
    }

    @GetMapping("/water")
    public ResponseEntity<?> getWater() {
        log.info("get-water");
        return ResponseEntity.ok(waterRepository.getWaters());
    }

    @GetMapping("/sights")
    public ResponseEntity<?> getSights() {
        log.info("get-sights");
        return ResponseEntity.ok(sightRepository.getSights().stream().filter(x -> x.getLat() != null).collect(Collectors.toList()));
    }
}
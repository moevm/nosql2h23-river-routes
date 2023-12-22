package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import se.moevm.river_routes.osm.dto.RouteRequest;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.services.OSMPumpService;
import se.moevm.river_routes.osm.services.ParseService;
import se.moevm.river_routes.osm.services.RouteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@Slf4j
public class Controller {
    private final RouteService routeService;
    private final ParseService parseService;

    @GetMapping("/piers")
    public ResponseEntity<?> getPierces() {
        log.info("get-pierces");
        return ResponseEntity.ok(parseService.getAllPierces());
    }

    @GetMapping("/sights")
    public ResponseEntity<?> getSights() {
        log.info("get-sights");
        return ResponseEntity.ok(parseService.getAllSights());
    }

    @PostMapping("/path")
    public ResponseEntity<?> getPath(@RequestBody RouteRequest request) {
        log.info("get-path: {} {} {}", request.getStartPoint(), request.getEndPoint(), request.getSights());
        return ResponseEntity.ok(routeService.findPath(request));
    }

    @GetMapping("/routes")
    public ResponseEntity<?> getRoutes() {
        log.info("get-routes");
        return ResponseEntity.ok(parseService.getAllRoutes());
    }

}

package se.moevm.river_routes.osm.client;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import se.moevm.river_routes.osm.dto.ImportRoutesRequest;
import se.moevm.river_routes.osm.dto.RouteDataDTO;
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
        log.info("get-routes: {}", parseService.getAllRoutes().size());
        return ResponseEntity.ok(parseService.getAllRoutes());
    }

    @PostMapping("/routes/add")
    public ResponseEntity<?> addRoute(@RequestBody RouteDataDTO route) {
        log.info("add-routes");
        return ResponseEntity.ok(parseService.saveRoute(route));
    }

    @PostMapping("/routes/import")
    public ResponseEntity<?> importRoutes(@RequestBody ImportRoutesRequest importRoutesRequest) {
        log.info("import-routes");
        importRoutesRequest.getRoutes().forEach(parseService::saveRoute);
        return ResponseEntity.ok(parseService.getAllRoutes());
    }

}

package se.moevm.river_routes.osm.services;

import se.moevm.river_routes.osm.dto.RouteDataDTO;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.List;
import java.util.Optional;

public interface ParseService {

    List<WaterNode> getAllWater();
    List<PierNode> getAllPierces();
    List<SightNode> getAllSights();
    List<RouteDataDTO> getAllRoutes();
    RouteDataDTO saveRoute(RouteDataDTO route);
    Optional<RouteDataDTO> findRouteById(Long id);
}

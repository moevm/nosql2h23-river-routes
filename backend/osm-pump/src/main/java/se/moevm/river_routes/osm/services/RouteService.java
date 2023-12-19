package se.moevm.river_routes.osm.services;

import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.List;

public interface RouteService {

    List<WaterNode> findPathBetweenPiers(PierNode startPier, PierNode endPier);

    List<WaterNode> findPathBetweenPiersIncludeSights(PierNode startPier, PierNode endPier, List<SightNode> sightsToInclude);
}

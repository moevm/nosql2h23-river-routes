package se.moevm.river_routes.osm.services;

import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.List;

public interface ParseService {

    List<WaterNode> getAllWater();
    List<PierNode> getAllPierces();
    List<SightNode> getAllSights();
}

package se.moevm.river_routes.osm.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface WaterRepository extends Neo4jRepository<WaterNode, Long> {

    @Query("MATCH (n:Water) RETURN n limit 50")
    List<WaterNode> getWaters();

    @Query("MATCH path = shortestPath((startNode:Pier {lat: :startLat, lon: :startLon})-[*..10]-(endNode:Pier {lat: :endLat, lon: :endLon})) RETURN path;")
    Iterable<WaterNode> getPath(double startLat, double startLon, double endLat, double endLon);
}

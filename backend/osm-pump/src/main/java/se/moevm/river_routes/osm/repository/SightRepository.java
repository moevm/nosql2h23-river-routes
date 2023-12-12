package se.moevm.river_routes.osm.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;

import java.util.List;

@Repository
public interface SightRepository extends Neo4jRepository<SightNode, Long> {

    @Query("MATCH (n:Pier) RETURN n limit 50")
    List<SightNode> getSights();
}

package se.moevm.river_routes.osm.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.List;

@Repository
public interface WaterRepository extends Neo4jRepository<WaterNode, Long> {

    @Query("MATCH (n:Water) RETURN n limit 50")
    List<WaterNode> getWaters();
}

package se.moevm.river_routes.osm.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import se.moevm.river_routes.osm.entity.SightNode;

@Repository
public interface SightRepository extends Neo4jRepository<SightNode, Long> {

}

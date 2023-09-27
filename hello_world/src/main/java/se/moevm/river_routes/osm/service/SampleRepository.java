package se.moevm.river_routes.osm.service;

import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface SampleRepository extends Neo4jRepository<SampleNode, String> {

}

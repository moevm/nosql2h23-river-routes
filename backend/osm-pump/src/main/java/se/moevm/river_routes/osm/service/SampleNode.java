package se.moevm.river_routes.osm.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Hello")
@Getter
@AllArgsConstructor
@ToString
public class SampleNode {

    @Id
    private final String name;
}

package se.moevm.river_routes.osm.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.neo4j.driver.util.Immutable;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Getter
@Immutable
@Node("Pier")
public class PierNode implements Node2D {

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = "DIRECT_WAY", direction = Relationship.Direction.OUTGOING)
    private final List<WaterNode> neighbours = new ArrayList<>();

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    public void addNeighbour(WaterNode node) {
        neighbours.add(node);
    }
}

package se.moevm.river_routes.osm.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@Builder
@RequiredArgsConstructor
@Getter
@Node("Sight")
public class SightNode implements StorableNode {

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = "OBSERVABLE_FROM", direction = Relationship.Direction.INCOMING)
    private final List<WaterNode> availableFrom = new ArrayList<>();

    @Property("title")
    private final String title;

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    public void addObservationFromWater(WaterNode node) {
        availableFrom.add(node);
    }
}

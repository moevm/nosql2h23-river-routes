package se.moevm.river_routes.osm.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
@Node("Sight")
public class SightNode implements StorableNode {

    @Id
    @GeneratedValue
    private final Long id;

    @Relationship(type = "DIRECT_WAY", direction = Relationship.Direction.INCOMING)
    private final List<WaterNode> availableFrom;

    @Property("title")
    private final String title;

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;
}

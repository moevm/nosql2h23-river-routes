package se.moevm.river_routes.osm.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Node("Sight")
public class SightNode {

    @Id
    @GeneratedValue
    private Long id;

    @Property("title")
    private final String title;

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    @Property("wiki_link")
    private String wikiLink;

    @Property("updated_at")
    private OffsetDateTime updatedAt;

    @Relationship(type = "OBSERVABLE_FROM", direction = Relationship.Direction.INCOMING)
    private final List<WaterNode> availableFrom = new ArrayList<>();

    public void addObservationFromWater(WaterNode node) {
        availableFrom.add(node);
    }
}

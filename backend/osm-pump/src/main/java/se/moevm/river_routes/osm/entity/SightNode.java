package se.moevm.river_routes.osm.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Node("Sight")
public class SightNode implements Node2D {

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

    @Setter
    @Property("wiki_link")
    private String wikiLink;

    @LastModifiedDate
    @Property("updated_at")
    private OffsetDateTime updatedAt;

    public SightNode(String title, Double lat, Double lon) {
        this.title = title;
        this.lat = lat;
        this.lon = lon;
    }

    public void addObservationFromWater(WaterNode node) {
        availableFrom.add(node);
    }
}

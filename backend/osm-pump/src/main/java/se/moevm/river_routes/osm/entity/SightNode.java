package se.moevm.river_routes.osm.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
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
@NoArgsConstructor
@ToString
@Node("Sight")
public class SightNode {

    @Id
    @GeneratedValue
    private Long id;

    @Property("title")
    private String title;

    @Property("lat")
    private Double lat;

    @Property("lon")
    private Double lon;

    @Property("website")
    private String website;

    @Property("architect")
    private String architect;

    @Property("year_of_construction")
    private String yearOfConstruction;

    @Property("start_date")
    private String startDate;

    @Property("updated_at")
    private OffsetDateTime updatedAt;

    @Relationship(type = "OBSERVABLE_FROM", direction = Relationship.Direction.INCOMING)
    private List<WaterNode> availableFrom = new ArrayList<>();

    public void addObservationFromWater(WaterNode node) {
        availableFrom.add(node);
    }
}

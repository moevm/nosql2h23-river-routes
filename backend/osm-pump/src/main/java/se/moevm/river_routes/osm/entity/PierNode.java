package se.moevm.river_routes.osm.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.neo4j.driver.util.Immutable;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
@Immutable
@ToString
@Node("Pier")
public class PierNode {

    @Id
    @GeneratedValue
    private Long id;

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    @Setter
    @Relationship(type = "DIRECT_WAY", direction = Relationship.Direction.OUTGOING)
    private List<WaterNode> neighbours = new ArrayList<>();

    public void addNeighbour(WaterNode node) {
        neighbours.add(node);
    }

}

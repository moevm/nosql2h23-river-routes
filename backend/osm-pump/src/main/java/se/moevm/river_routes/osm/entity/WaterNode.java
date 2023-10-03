package se.moevm.river_routes.osm.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Getter
@ToString(exclude = "neighbours")
@Node("Water")
public class WaterNode implements StorableNode {

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = "DIRECT_WAY", direction = Relationship.Direction.OUTGOING)
    private final Set<WaterNode> neighbours = new HashSet<>();

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    public WaterNode(Double lat, Double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public void addNeighbour(WaterNode node) {
        neighbours.add(node);
    }
}

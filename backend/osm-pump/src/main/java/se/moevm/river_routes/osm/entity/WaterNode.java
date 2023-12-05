package se.moevm.river_routes.osm.entity;

import lombok.Getter;
import lombok.ToString;
import org.neo4j.driver.util.Immutable;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@ToString(exclude = "neighbours")
@Immutable
@Node("Water")
public class WaterNode implements Node2D {

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = "WATER_WAY", direction = Relationship.Direction.OUTGOING)
    private final List<WaterWay> neighbours = new ArrayList<>();

    @Relationship(type = "PIER_WAY", direction = Relationship.Direction.OUTGOING)
    private final Set<PierNode> piers = new HashSet<>();

    @Relationship(type = "SIGHT_OBSERVE", direction = Relationship.Direction.OUTGOING)
    private final Set<SightNode> sights = new HashSet<>();

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    public WaterNode(Double lat, Double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public void addNeighbour(WaterNode node) {
        neighbours.add(new WaterWay(node, getRange(node)));
    }

    public void addPier(PierNode node) {
        piers.add(node);
    }

    public void addSight(SightNode node) {
        sights.add(node);
    }

    double getRange(WaterNode node) {
        return Math.sqrt(Math.pow(node.getLat() - this.lat, 2) + Math.pow(node.getLon() - this.lon, 2));
    }
}

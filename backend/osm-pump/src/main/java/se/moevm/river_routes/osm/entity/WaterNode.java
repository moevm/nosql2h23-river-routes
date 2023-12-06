package se.moevm.river_routes.osm.entity;

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

@Getter
@ToString(exclude = "neighbours")
@Immutable
@Node("Water")
public class WaterNode implements Node2D {

    @Id
    @GeneratedValue
    private Long id;

    @Setter
    @Relationship(type = "WATER_WAY", direction = Relationship.Direction.OUTGOING)
    private List<WaterWay> neighbours = new ArrayList<>();

    @Setter
    @Relationship(type = "PIER_WAY", direction = Relationship.Direction.OUTGOING)
    private List<PierNode> piers = new ArrayList<>();

    @Setter
    @Relationship(type = "SIGHT_OBSERVE", direction = Relationship.Direction.OUTGOING)
    private List<SightNode> sights = new ArrayList<>();

    @Property("lat")
    private final Double lat;

    @Property("lon")
    private final Double lon;

    public WaterNode(Double lat, Double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public WaterNode(Double lat, Double lon, List<SightNode> sighs, List<PierNode> piers, List<WaterWay> waterWays) {
        this.lat = lat;
        this.lon = lon;
        this.sights = sighs;
        this.piers = piers;
        this.neighbours = waterWays;
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

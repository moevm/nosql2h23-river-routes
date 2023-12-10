package se.moevm.river_routes.osm.entity;

import lombok.*;
import org.neo4j.driver.util.Immutable;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@ToString(exclude = {"neighbours", "piers"})
@Immutable
@Node("Water")
public class WaterNode {

    @Id
    @GeneratedValue
    private Long id;

    @Property("lat")
    private Double lat;

    @Property("lon")
    private Double lon;

    @Relationship(type = "WATER_WAY", direction = Relationship.Direction.OUTGOING)
    private List<WaterWay> neighbours = new ArrayList<>();

    @Relationship(type = "PIER_WAY", direction = Relationship.Direction.OUTGOING)
    private List<PierNode> piers = new ArrayList<>();

    @Relationship(type = "SIGHT_OBSERVE", direction = Relationship.Direction.OUTGOING)
    private List<SightNode> sights = new ArrayList<>();

    public void addNeighbour(WaterNode node) {
        neighbours.add(WaterWay.builder()
                        .node(node)
                        .length(getRange(node))
                        .build());
    }

    public void addPier(PierNode node) {
        piers.add(node);
    }

    public void addSight(SightNode node) {
        if (sights == null) {
            sights = new ArrayList<>();
        }
        sights.add(node);
    }

    double getRange(WaterNode node) {
        return Math.sqrt(Math.pow(node.getLat() - this.lat, 2) + Math.pow(node.getLon() - this.lon, 2));
    }
}

package se.moevm.river_routes.osm.entity;

import lombok.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

@Getter
@Builder
@RelationshipProperties
@RequiredArgsConstructor
@AllArgsConstructor
public class WaterWay {

    @RelationshipId
    @GeneratedValue
    private Long id;

    @TargetNode
    private WaterNode node;

    @Property
    private Double length;
}
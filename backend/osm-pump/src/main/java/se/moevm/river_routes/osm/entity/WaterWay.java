package se.moevm.river_routes.osm.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

@Getter
@RelationshipProperties
@RequiredArgsConstructor
public class WaterWay {

    @Id
    @GeneratedValue
    private Long id;

    @TargetNode
    private final WaterNode node;

    @Property
    private final Double length;
}
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

    @Property("address")
    private final String address;

}

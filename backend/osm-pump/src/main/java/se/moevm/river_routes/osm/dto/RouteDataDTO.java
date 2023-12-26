package se.moevm.river_routes.osm.dto;

import lombok.*;
import org.springframework.data.neo4j.core.schema.Property;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RouteDataDTO {
    private Long id;

    @Property("name")
    private String name;
    @Property("startPoint")
    private PierNode startPoint;
    @Property("endPoint")
    private PierNode endPoint;
    @Property("sights")
    private List<SightNode> sights;
    @Property("waterNodes")
    private List<WaterNode> waterNodes;
    @Property("createAt")
    private Date createAt;
}

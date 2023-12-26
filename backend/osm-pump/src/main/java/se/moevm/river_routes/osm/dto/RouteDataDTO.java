package se.moevm.river_routes.osm.dto;

import lombok.*;
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
    private String name;
    private PierNode startPoint;
    private PierNode endPoint;
    private List<SightNode> sights;
    private List<WaterNode> waterNodes;
    private Date createAt;
}

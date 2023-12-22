package se.moevm.river_routes.osm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.WaterNode;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
@Getter
@Setter
@Builder
public class RouteDataDTO {
    private Long id;
    private String name;
    private PierNode startPoint;
    private PierNode endPoint;
    private List<WaterNode> waterNodes;
    private Date createAt;
}

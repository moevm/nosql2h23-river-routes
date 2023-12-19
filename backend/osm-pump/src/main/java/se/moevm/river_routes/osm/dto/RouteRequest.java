package se.moevm.river_routes.osm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;

import java.util.List;

@AllArgsConstructor
@Data
@Getter
@Setter
public class RouteRequest {
    private PierNode startPoint;
    private PierNode endPoint;
    private List<SightNode> sight;
}

package se.moevm.river_routes.osm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Data
@Getter
@Setter
public class ImportRoutesRequest {
    private List<RouteDataDTO> routes;
}

package se.moevm.river_routes.osm.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Data
@Getter
@Setter
@NoArgsConstructor
public class ImportRoutesRequest {
    private List<RouteDataDTO> routes;
}

package se.moevm.river_routes.osm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.moevm.river_routes.osm.entity.Node2D;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Location2D implements Node2D {

    private Double lat;
    private Double lon;
}

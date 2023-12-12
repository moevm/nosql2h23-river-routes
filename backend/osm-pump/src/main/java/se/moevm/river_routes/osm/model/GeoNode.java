package se.moevm.river_routes.osm.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GeoNode {

    Long ref;
    String type;
    String role;
    List<Location2D> geometry;
}

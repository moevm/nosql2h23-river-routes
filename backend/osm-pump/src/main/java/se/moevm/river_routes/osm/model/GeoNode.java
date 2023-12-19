package se.moevm.river_routes.osm.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GeoNode {

    private Long ref;
    private String type;
    private String role;

    private List<Location2D> geometry;
    private String name;
}

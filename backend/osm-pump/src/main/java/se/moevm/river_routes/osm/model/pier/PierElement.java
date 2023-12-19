package se.moevm.river_routes.osm.model.pier;

import lombok.Data;
import lombok.ToString;
import se.moevm.river_routes.osm.model.GeoNode;

import java.util.List;

@Data
@ToString
public class PierElement {
    private List<GeoNode> members;
    private String type;
}

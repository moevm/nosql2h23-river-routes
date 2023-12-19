package se.moevm.river_routes.osm.model.water;

import lombok.Data;
import lombok.ToString;
import se.moevm.river_routes.osm.model.GeoElement;

import java.util.List;

@Data
@ToString
public class WaterResponse {

    private List<WaterElement> elements;

}

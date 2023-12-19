package se.moevm.river_routes.osm.model.sight;

import lombok.Data;
import lombok.ToString;
import se.moevm.river_routes.osm.model.water.WaterElement;

import java.util.List;

@Data
@ToString
public class SightResponse {

    List<SightElement> elements;

}

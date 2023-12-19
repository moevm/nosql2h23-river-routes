package se.moevm.river_routes.osm.model.pier;

import lombok.Data;
import lombok.ToString;
import se.moevm.river_routes.osm.model.water.WaterElement;

import java.util.List;

@Data
@ToString
public class PierResponse {

    List<PierElement> elements;

}

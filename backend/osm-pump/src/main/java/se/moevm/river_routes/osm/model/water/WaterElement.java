package se.moevm.river_routes.osm.model.water;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class WaterElement {
    private Double lat;
    private Double lon;
    private String type;
}

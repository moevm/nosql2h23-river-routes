package se.moevm.river_routes.osm.model.sight;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;
import se.moevm.river_routes.osm.model.GeoBounds;

@Data
@ToString
public class SightElement {

    @Getter(AccessLevel.NONE)
    private Double lat;

    @Getter(AccessLevel.NONE)
    private Double lon;

    private String type;
    private SightTags tags;
    private GeoBounds bounds;

    public Double getLat() {
        if (lat != null) {
            return lat;
        } else {
            return (bounds.getMinlat() + bounds.getMaxlat()) / 2;
        }
    }

    public Double getLon() {
        if (lon != null) {
            return lon;
        } else {
            return (bounds.getMinlon() + bounds.getMaxlon()) / 2;
        }
    }
}

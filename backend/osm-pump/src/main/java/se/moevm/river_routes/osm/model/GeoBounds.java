package se.moevm.river_routes.osm.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class GeoBounds {

    private Double minlat;
    private Double minlon;
    private Double maxlat;
    private Double maxlon;
}

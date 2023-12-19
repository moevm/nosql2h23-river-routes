package se.moevm.river_routes.osm.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class WaterDataDTO {
    private Long id;
    private Double lat;
    private Double lon;
    private List<Long> piers_id;
    private List<Long> sights_id;
    private List<Long> neighbors_id;
}

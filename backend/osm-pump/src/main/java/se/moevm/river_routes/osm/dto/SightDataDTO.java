package se.moevm.river_routes.osm.dto;

import lombok.*;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SightDataDTO {
    private Long id;
    private String title;
    private Double lat;
    private Double lon;
}

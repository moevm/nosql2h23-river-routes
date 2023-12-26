package se.moevm.river_routes.osm.dto;

import lombok.*;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PierDataDTO {
    private Long id;
    private Double lat;
    private Double lon;
    private String address;
}

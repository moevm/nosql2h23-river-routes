package se.moevm.river_routes.osm.client;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Getter
public class GeographicalNamesConfig {

    @Value("${process-geo-names.rivers}")
    private List<String> rivers;

}

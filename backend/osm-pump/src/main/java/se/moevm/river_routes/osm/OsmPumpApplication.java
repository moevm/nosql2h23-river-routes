package se.moevm.river_routes.osm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableFeignClients
@SpringBootApplication
public class OsmPumpApplication {

    public static void main(String[] args) {
        SpringApplication.run(OsmPumpApplication.class, args);
    }

}

package se.moevm.river_routes.osm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableNeo4jRepositories
@SpringBootApplication
public class OsmPumpApplication {

    public static void main(String[] args) {
        SpringApplication.run(OsmPumpApplication.class, args);
    }

}

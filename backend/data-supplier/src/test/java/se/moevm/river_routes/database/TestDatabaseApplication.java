package se.moevm.river_routes.database;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;
import se.moevm.river_routes.data.DatabaseApplication;

@TestConfiguration(proxyBeanMethods = false)
public class TestDatabaseApplication {

    public static void main(String[] args) {
        SpringApplication.from(DatabaseApplication::main).with(TestDatabaseApplication.class).run(args);
    }

}

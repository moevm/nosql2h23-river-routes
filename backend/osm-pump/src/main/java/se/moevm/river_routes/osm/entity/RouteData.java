package se.moevm.river_routes.osm.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Node("Route")
public class RouteData {

    @Id
    @GeneratedValue
    private Long id;

    @Relationship(type = "STARTS_AT", direction = Relationship.Direction.OUTGOING)
    private final PierNode start;

    @Relationship(type = "FINISH_AT", direction = Relationship.Direction.OUTGOING)
    private final PierNode finish;

    @Relationship(type = "OBSERVES", direction = Relationship.Direction.OUTGOING)
    private final List<SightNode> observables = new ArrayList<>();

    @CreatedDate
    @Property("created_at")
    private final OffsetDateTime createdAt;

    @Property("length_m")
    private final Long lengthMeters;

    @Property("title")
    private final String title;

    @Property("calculator")
    private final String calculator;

    public RouteData(PierNode start, PierNode finish, OffsetDateTime createdAt, Long lengthMeters, String title, String calculator) {
        this.start = start;
        this.finish = finish;
        this.createdAt = createdAt;
        this.lengthMeters = lengthMeters;
        this.title = title;
        this.calculator = calculator;
    }
}

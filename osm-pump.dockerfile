FROM ubuntu:latest as builder

WORKDIR /builder

RUN apt-get update -y && \
    apt-get install -y \
    openjdk-17-jdk \
    maven

COPY backend/pom.xml .
COPY backend/osm-pump ./osm-pump
COPY backend/data-supplier ./data-supplier

RUN mvn package -DskipTests

FROM openjdk:17-alpine as runner

COPY --from=builder "/builder/osm-pump/target/osm-pump-*.jar" osm-pump.jar

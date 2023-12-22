package se.moevm.river_routes.osm.services.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import se.moevm.river_routes.osm.dto.PierDataDTO;
import se.moevm.river_routes.osm.dto.RouteDataDTO;
import se.moevm.river_routes.osm.dto.SightDataDTO;
import se.moevm.river_routes.osm.dto.WaterDataDTO;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.services.ParseService;

import java.io.File;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.OffsetDateTime;
import java.util.*;

@Service
@Slf4j
public class ParseServiceImpl implements ParseService {

    @Value("classpath:data/pierces.json")
    Resource resourcePierFile;

    @Value("classpath:data/data/water.json")
    Resource resourceWaterFile;

    @Value("classpath:data/data/sights.json")
    Resource resourceSightFile;

    @Value("classpath:data/data/routes.json")
    Resource resourceRouteFile;

    private final ObjectMapper mapper = new ObjectMapper();

    private final List<WaterNode> waterNodes = new ArrayList<>();
    private final List<SightNode> sightNodes = new ArrayList<>();
    private final List<PierNode> pierNodes = new ArrayList<>();
    private final List<RouteDataDTO> routes = new ArrayList<>();

    @PostConstruct
    void postConstruct() {
        getResourceSightData();
        getResourcePiercesData();
        linkWaterNodes(getResourceWaterData());
        getResourceRouteData();
    }

    private void getResourceRouteData() {
        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/routes.json")) {
            if (inputStream == null) {
                throw new Exception("Resource not found");
            }
            routes.addAll(mapper.readValue(IOUtils.toString(inputStream, StandardCharsets.UTF_8), new TypeReference<>() {}));
        } catch (Exception e) {
            log.error("Cannot read data");
        }
    }

    private void getResourceSightData() {
        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/sights.json")) {
            if (inputStream == null) {
                throw new Exception("Resource not found");
            }
            List<SightDataDTO> dtoList = mapper.readValue(IOUtils.toString(inputStream, StandardCharsets.UTF_8), new TypeReference<>() {});
            dtoList.forEach(sightDataDTO -> {
                sightNodes.add(SightNode.builder()
                        .id(sightDataDTO.getId())
                        .title(sightDataDTO.getTitle())
                        .lat(sightDataDTO.getLat())
                        .lon(sightDataDTO.getLon())
                        .updatedAt(OffsetDateTime.now())
                        .build());
            });
        } catch (Exception e) {
            log.error("Cannot read data");
        }
    }

    private void getResourcePiercesData() {
        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/pierces.json")) {
            if (inputStream == null) {
                throw new Exception("Resource not found");
            }
            List<PierDataDTO> dtoList = mapper.readValue(IOUtils.toString(inputStream, StandardCharsets.UTF_8), new TypeReference<>() {});
            dtoList.forEach(pierDataDTO -> {
                pierNodes.add(PierNode.builder()
                        .id(pierDataDTO.getId())
                        .lat(pierDataDTO.getLat())
                        .lon(pierDataDTO.getLon())
                        .build());
            });
        } catch (Exception e) {
            log.error("Cannot read data");
        }
    }

    private List<WaterDataDTO> getResourceWaterData() {
        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/data/water.json")) {
            if (inputStream == null) {
                throw new Exception("Resource not found");
            }
            List<WaterDataDTO> dtoList = mapper.readValue(IOUtils.toString(inputStream, StandardCharsets.UTF_8), new TypeReference<>() {});
            dtoList.forEach(waterDataDTO -> {
                waterNodes.add(WaterNode.builder()
                        .id(waterDataDTO.getId())
                        .lat(waterDataDTO.getLat())
                        .lon(waterDataDTO.getLon())
                        .build());
            });
            return dtoList;
        } catch (Exception e) {
            log.error("Cannot read data");
        }
        return new ArrayList<>();
    }

    private void linkWaterNodes(List<WaterDataDTO> dtoList) {
        for (int index = 0; index < dtoList.size(); index++) {
            int finalIndex = index;
            dtoList.get(index).getSights_id().forEach(sightId -> {
                waterNodes.get(finalIndex).addSight(findSightById(sightId));
            });
            dtoList.get(index).getPiers_id().forEach(pierId -> {
                waterNodes.get(finalIndex).addPier(findPierById(pierId));
            });
            dtoList.get(index).getNeighbors_id().forEach(waterId -> {
                waterNodes.get(finalIndex).addNeighbour(findWaterById(waterId));
            });
        }
    }

    private WaterNode findWaterById(Long id) {
        return waterNodes
                .stream()
                .filter(waterNode -> waterNode.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private PierNode findPierById(Long id) {
        return pierNodes
                .stream()
                .filter(pierNode -> pierNode.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    private SightNode findSightById(Long id) {
        return sightNodes
                .stream()
                .filter(sightNode -> sightNode.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<WaterNode> getAllWater() {
        return waterNodes;
    }

    @Override
    public List<PierNode> getAllPierces() {
        return pierNodes;
    }

    @Override
    public List<SightNode> getAllSights() {
        return sightNodes;
    }

    @Override
    public List<RouteDataDTO> getAllRoutes() {
//        System.out.println(routes);
        return routes;
    }

    @Override
    public RouteDataDTO saveRoute(RouteDataDTO route) {
        route.setId(routes.size() + 1L);
        routes.add(route);
        return route;
    }

    @Override
    public Optional<RouteDataDTO> findRouteById(Long id) {
        for (RouteDataDTO route : routes) {
            if (route.getId().equals(id)) {
                return Optional.of(route);
            }
        }
        return Optional.empty();
    }
}

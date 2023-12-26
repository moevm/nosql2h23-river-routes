package se.moevm.river_routes.osm.services.impl;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import se.moevm.river_routes.osm.dto.RouteDataDTO;
import se.moevm.river_routes.osm.dto.RouteRequest;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.services.OSMPumpService;
import se.moevm.river_routes.osm.services.ParseService;
import se.moevm.river_routes.osm.services.RouteService;

import java.time.OffsetDateTime;
import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class RouteServiceImpl implements RouteService {

    private final ParseService parseService;
    private final OSMPumpService pumpService;

    @PostConstruct
    public void init() {
        pumpService.pumpAllData();

        PierNode start = parseService.getAllPierces().stream().filter(p -> p.getId() == 2).findFirst().get();
        PierNode end = parseService.getAllPierces().stream().filter(p -> p.getId() == 8).findFirst().get();
        SightNode sight1 = parseService.getAllSights().stream().filter(s -> s.getId() == 7).findFirst().get();
        SightNode sight2 = parseService.getAllSights().stream().filter(s -> s.getId() == 8).findFirst().get();
        SightNode sight3 = parseService.getAllSights().stream().filter(s -> s.getId() == 9).findFirst().get();

        WaterNode node1 = parseService.getAllWater().stream().filter(w -> w.getId() == 5).findFirst().get();
        WaterNode node2 = parseService.getAllWater().stream().filter(w -> w.getId() == 6).findFirst().get();
        WaterNode node3 = parseService.getAllWater().stream().filter(w -> w.getId() == 7).findFirst().get();
        WaterNode node4 = parseService.getAllWater().stream().filter(w -> w.getId() == 8).findFirst().get();
        WaterNode node5 = parseService.getAllWater().stream().filter(w -> w.getId() == 9).findFirst().get();
        WaterNode node6 = parseService.getAllWater().stream().filter(w -> w.getId() == 10).findFirst().get();
        parseService.saveRoute(
                RouteDataDTO.builder()
                        .name("По Неве")
                        .startPoint(start)
                        .endPoint(end)
                        .sights(List.of(sight1, sight2, sight3))
                        .waterNodes(List.of(node1, node2, node3, node4, node5, node6))
                        .createAt(new Date())
                        .build());
    }

    @Override
    public RouteDataDTO findPath(RouteRequest request) {
        return parseService.saveRoute(
                RouteDataDTO.builder()
                        .name(request.getName())
                        .startPoint(request.getStartPoint())
                        .endPoint(request.getEndPoint())
                        .sights(request.getSights())
                        .waterNodes(findPathBetweenPiersIncludeSights(request.getStartPoint(), request.getEndPoint(), request.getSights()))
                        .createAt(new Date())
                        .build());
    }

    @Override
    public List<WaterNode> findPathBetweenPiersIncludeSights(PierNode startPier, PierNode endPier, List<SightNode> sightsToInclude) {
        WaterNode start = null;
        WaterNode end = null;
        for (WaterNode waterNode : parseService.getAllWater()) {
            for (PierNode pierNode : waterNode.getPiers()) {
                if (Objects.equals(pierNode.getId(), startPier.getId())) {
                    start = waterNode;
                }
                if (Objects.equals(pierNode.getId(), endPier.getId())) {
                    end = waterNode;
                }
            }
        }
        List<WaterNode> waterToVisit = new ArrayList<>();
        waterToVisit.add(start);

        for (WaterNode waterNode : parseService.getAllWater()) {
            for (SightNode sightNode : waterNode.getSights()) {
                if (sightsToInclude.contains(sightNode)) {
                    waterToVisit.add(waterNode);
                }
            }
        }
        sightsToInclude.forEach(sight -> {
            for (WaterNode waterNode : parseService.getAllWater()) {
                for (SightNode sightNode : waterNode.getSights()) {
                    if (Objects.equals(sightNode.getId(), sight.getId())) {
                        waterToVisit.add(waterNode);
                    }
                }
            }
        });
        waterToVisit.add(end);

        Graph g = new Graph();
        parseService.getAllWater().forEach(waterNode -> {
            waterNode.getNeighbours().forEach(neighbour -> {
                g.addEdge(waterNode, neighbour);
            });
        });

        List<WaterNode> path = new ArrayList<>();
        for (int i=0; i < waterToVisit.size() - 1; i++) {
            path.addAll(g.depthFirstSearch(waterToVisit.get(i), waterToVisit.get(i+1)));
        }

        System.out.println(path);
        return path;
    }

    static public class Graph {
        private Map<WaterNode, List<WaterNode>> adjacencyList;

        public Graph() {
            this.adjacencyList = new HashMap<>();
        }

        public void addEdge(WaterNode source, WaterNode destination) {
            if (!adjacencyList.containsKey(source)) {
                adjacencyList.put(source, new ArrayList<>());
            }
            if (!adjacencyList.containsKey(destination)) {
                adjacencyList.put(destination, new ArrayList<>());
            }
            adjacencyList.get(source).add(destination);
        }

        public List<WaterNode> depthFirstSearch(WaterNode start, WaterNode end) {
            Set<WaterNode> visited = new HashSet<>();
            List<WaterNode> path = new ArrayList<>();
            Stack<WaterNode> stack = new Stack<>();
            stack.push(start);
            visited.add(start);

            while (!stack.isEmpty()) {
                WaterNode current = stack.pop();
                path.add(current);

                if (current.equals(end)) {
                    return path;  // Если достигнута конечная вершина, возвращаем путь
                }

                for (WaterNode neighbor : adjacencyList.get(current)) {
                    if (!visited.contains(neighbor)) {
                        stack.push(neighbor);
                        visited.add(neighbor);
                    }
                }
            }

            return Collections.emptyList();  // Если путь не найден, возвращаем пустой список
        }
    }


}

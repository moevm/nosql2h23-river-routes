package se.moevm.river_routes.osm.services.impl;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import se.moevm.river_routes.osm.entity.PierNode;
import se.moevm.river_routes.osm.entity.SightNode;
import se.moevm.river_routes.osm.entity.WaterNode;
import se.moevm.river_routes.osm.services.OSMPumpService;
import se.moevm.river_routes.osm.services.ParseService;
import se.moevm.river_routes.osm.services.RouteService;

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
    }

    @Override
    public List<WaterNode> findPathBetweenPiers(PierNode startPier, PierNode endPier) {
        WaterNode start = parseService.getAllWater().stream().filter(waterNode -> waterNode.getPiers().contains(startPier)).findFirst().orElse(null);
        WaterNode end = parseService.getAllWater().stream().filter(waterNode -> waterNode.getPiers().contains(endPier)).findFirst().orElse(null);

        return null;
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

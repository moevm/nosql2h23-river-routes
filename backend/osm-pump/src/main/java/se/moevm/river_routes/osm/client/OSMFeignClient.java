package se.moevm.river_routes.osm.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import se.moevm.river_routes.osm.model.OsmResponse;
import se.moevm.river_routes.osm.model.pier.PierResponse;
import se.moevm.river_routes.osm.model.pier.PierTags;
import se.moevm.river_routes.osm.model.sight.SightResponse;
import se.moevm.river_routes.osm.model.water.WaterResponse;

@FeignClient(value = "osmClient", url = "https://overpass-api.de/api/interpreter")
public interface OSMFeignClient {

    @RequestMapping(method = RequestMethod.GET, value = "?data=[out:json];rel[name=\"{river}\"]->.river;.river out geom;nwr(around.river:50)[power=plant][\"plant:source\"=hydro](area);out center;")
    OsmResponse getRiverNodes(@PathVariable String river);

    @RequestMapping(method = RequestMethod.GET, value = "?data={query}")
    PierResponse requestPiers(@PathVariable String query);

    @RequestMapping(method = RequestMethod.GET, value = "?data={query}")
    WaterResponse requestWater(@PathVariable String query);

    @RequestMapping(method = RequestMethod.GET, value = "?data={query}")
    SightResponse requestSights(@PathVariable String query);

    @RequestMapping(method = RequestMethod.GET, value = "?data={query}")
    String getNodesStr(@PathVariable String query);

    default PierResponse getPierNodes() {
        return requestPiers("[out:json];nwr[man_made=pier](around:15000,59.940049,30.328738);out geom;");
    }

    default SightResponse getSightNodes() {
        return requestSights("[out:json];nwr[tourism=attraction](around:15000,59.940049,30.328738);out geom;");
    }

    @RequestMapping(method = RequestMethod.GET, value = "?data=[out:json];rel[name=\"{river}\"]->.river;.river out geom;nwr(around.river:50)[power=plant][\"plant:source\"=hydro](area);out center;")
    OsmResponse getRiverNodesRU(@PathVariable String river);
}

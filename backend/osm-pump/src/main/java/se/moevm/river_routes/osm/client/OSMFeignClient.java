package se.moevm.river_routes.osm.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import se.moevm.river_routes.osm.model.OsmResponse;

@FeignClient(value = "osmClient", url = "https://overpass-api.de/api/interpreter")
public interface OSMFeignClient {

    @RequestMapping(method = RequestMethod.GET, value = "?data=[out:json];rel[name=\"{river}\"]->.river;.river out geom;nwr(around.river:50)[power=plant][\"plant:source\"=hydro](area);out center;")
    OsmResponse getRiverNodes(@PathVariable String river);
}

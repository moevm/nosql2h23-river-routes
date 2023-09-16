package se.moevm.river_routes.osm.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "waterClient", url = "https://overpass-api.de/api/interpreter")
public interface WaterFeignClient {

    @RequestMapping(method = RequestMethod.GET, value = "?data=[out:json];rel[name=\"Нева\"]->.river;.river out geom;nwr(around.river:50)[power=plant][\"plant:source\"=hydro](area);out center;")
    String getWaterNodes();
}

import React from "react";
import { Page } from "@src/components/Page/Page";
import { Box } from "@material-ui/core";
import { useParams } from "react-router-dom";

import routes from "@src/data/routes.json";
import { Route } from "@src/store/route/routeTypes";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Camera, CameraFlyTo, Viewer } from "resium";
import { Cartesian3 } from "cesium";
import { MapPoint } from "@src/components/MapPoint/MapPoint";

export const RouteOverview = () => {
  const id = useParams();

  const allRoutes: Route[] = JSON.parse(JSON.stringify(routes));
  const currentRoute = allRoutes.find((elem) => elem.id === parseInt(id.id));

  return (
    <Page title={"О маршруте"} description={"Ознакомьтесь с информацие о маршруте"}>
      <Box display={"flex"} flexDirection={"column"} width={"100%"} padding={"4em"}>
        <h3>Название водного маршрута</h3>
        <Box display={"flex"} flexDirection={"row"} width={"100%"} justifyContent={"space-between"}>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
            <div>
              <LocationOnOutlinedIcon style={{ marginRight: "0.7em" }} />
              Начало маршрута: {currentRoute.startLon}, {currentRoute.startLat}
            </div>
            {currentRoute.sights.map((elem, num) => (
              <div
                style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}
                key={num}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    textAlign: "center",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1em",
                  }}
                >
                  {num + 1}
                </div>
                <div>{elem.title}</div>
              </div>
            ))}
            <div>
              <LocationOnOutlinedIcon style={{ marginRight: "0.7em" }} />
              Конец маршрута: {currentRoute.endLon}, {currentRoute.endLat}
            </div>
          </Box>
          <Viewer
            style={{ width: "500px", height: "800px", paddingRight: "8em" }}
            geocoder={false}
            timeline={false}
            navigationHelpButton={false}
            homeButton={false}
            baseLayerPicker={false}
          >
            <Camera />
            <CameraFlyTo
              duration={2}
              destination={Cartesian3.fromDegrees(
                currentRoute.sights[Math.floor(currentRoute.sights.length / 2)].lon,
                currentRoute.sights[Math.floor(currentRoute.sights.length / 2)].lat,
                3000,
              )}
              once={true}
            />
            {currentRoute.sights.map((elem) => (
              <MapPoint data={elem} onClickHandler={null} isSelected={false} isSight={true} />
            ))}
            <MapPoint
              data={{
                id: currentRoute.id,
                lat: currentRoute.startLat,
                lon: currentRoute.startLon,
                waterNodes: [],
                wikiLink: "",
              }}
              onClickHandler={null}
              isSelected={true}
              isSight={false}
            />
            <MapPoint
              data={{
                id: currentRoute.id,
                lat: currentRoute.endLat,
                lon: currentRoute.endLon,
                waterNodes: [],
                wikiLink: "",
              }}
              onClickHandler={null}
              isSelected={true}
              isSight={false}
            />
          </Viewer>
        </Box>
      </Box>
    </Page>
  );
};

export default RouteOverview;

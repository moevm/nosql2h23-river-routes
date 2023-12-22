import React, { useEffect, useState } from "react";
import { Page } from "@src/components/Page/Page";
import { Box, CircularProgress, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";

import routes from "@src/data/routes.json";
import { GET_ALL_ROUTES_R, Route, WaterNode } from "@src/store/route/routeTypes";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Camera, CameraFlyTo, Polyline, PolylineCollection, Viewer } from "resium";
import { Cartesian3 } from "cesium";
import { MapPoint } from "@src/components/MapPoint/MapPoint";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes } from "@src/store/route/routeActions";

export const RouteOverview = () => {
  const id = useParams();

  const _allRoutes: Route[] = useSelector((state: any) => state.route.allRoutes);
  const [allRoutes, setAllRoutes] = useState<Route[]>(_allRoutes);
  const [currentRoute, setCurrentRoute] = useState<Route>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (_allRoutes.length) {
      setCurrentRoute(
        _allRoutes.find((elem) => {
          return elem.id === parseInt(id.id);
        }),
      );
    } else {
      dispatch({ type: GET_ALL_ROUTES_R });
      dispatch<any>(getAllRoutes());
    }
  }, [_allRoutes]);

  return (
    <Page title={"О маршруте"} description={"Ознакомьтесь с информацие о маршруте"}>
      {_allRoutes.length && currentRoute ? (
        <Box display={"flex"} flexDirection={"column"} width={"100%"} padding={"4em"}>
          <h3>Название водного маршрута</h3>
          <Box display={"flex"} flexDirection={"row"} width={"100%"} justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
              <div>
                <LocationOnOutlinedIcon style={{ marginRight: "0.7em" }} />
                Начало маршрута: {currentRoute.startPoint.lat}, {currentRoute.startPoint.lon}
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
                Конец маршрута: {currentRoute.endPoint.lat}, {currentRoute.endPoint.lon}
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
              <PolylineCollection>
                {/*<Polyline*/}
                {/*  positions={[*/}
                {/*    Cartesian3.fromDegrees(currentRoute.startPoint.lon, currentRoute.startPoint.lat, 2),*/}
                {/*    Cartesian3.fromDegrees(currentRoute.waterNodes[0].lon, currentRoute.waterNodes[0].lat, 2),*/}
                {/*    Cartesian3.fromDegrees(currentRoute.waterNodes[0].lon, currentRoute.waterNodes[0].lat, 2),*/}
                {/*  ]}*/}
                {/*  width={5}*/}
                {/*/>*/}
                {currentRoute.waterNodes.map(
                  (elem: WaterNode, num) =>
                    num !== currentRoute.waterNodes.length - 1 && (
                      <Polyline
                        positions={[
                          Cartesian3.fromDegrees(elem.lon, elem.lat, 2),
                          Cartesian3.fromDegrees(
                            currentRoute.waterNodes[num + 1].lon,
                            currentRoute.waterNodes[num + 1].lat,
                            2,
                          ),
                          Cartesian3.fromDegrees(
                            currentRoute.waterNodes[num + 1].lon,
                            currentRoute.waterNodes[num + 1].lat,
                            2,
                          ),
                        ]}
                        width={5}
                      />
                    ),
                )}
                {/*<Polyline*/}
                {/*  positions={[*/}
                {/*    Cartesian3.fromDegrees(*/}
                {/*      currentRoute.waterNodes[currentRoute.waterNodes.length - 1].lon,*/}
                {/*      currentRoute.waterNodes[currentRoute.waterNodes.length - 1].lat,*/}
                {/*      2,*/}
                {/*    ),*/}
                {/*    Cartesian3.fromDegrees(currentRoute.endPoint.lon, currentRoute.endPoint.lat, 2),*/}
                {/*    Cartesian3.fromDegrees(currentRoute.endPoint.lon, currentRoute.endPoint.lat, 2),*/}
                {/*  ]}*/}
                {/*  width={5}*/}
                {/*/>*/}
              </PolylineCollection>
              {currentRoute.sights.map((elem) => (
                <MapPoint data={elem} onClickHandler={null} isSelected={false} isSight={true} />
              ))}
              <MapPoint
                data={{
                  id: currentRoute.id,
                  lat: currentRoute.startPoint.lat,
                  lon: currentRoute.startPoint.lon,
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
                  lat: currentRoute.endPoint.lat,
                  lon: currentRoute.endPoint.lon,
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
      ) : (
        <Container maxWidth={"lg"} style={{ display: "flex", justifyContent: "center", padding: "5em" }}>
          <CircularProgress />
        </Container>
      )}
    </Page>
  );
};

export default RouteOverview;

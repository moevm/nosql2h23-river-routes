import React, { useState } from "react";
import { Page } from "@src/components/Page/Page";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import { Camera, CameraFlyTo, Entity, Polyline, PolylineCollection, Viewer } from "resium";
import pierses from "@src/data/pierses.json";
import sigths from "@src/data/sights.json";
import { Pierse, Sight } from "@src/store/route/routeTypes";
import { Cartesian3, Color, InterpolationAlgorithm } from "cesium";
import * as Cesium from "cesium";
import { MapPoint } from "@src/components/MapPoint/MapPoint";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    padding: "3em",
  },
}));

//
export const CreateRoute = () => {
  const classes = useStyles();

  const [selectedSights, setSelectedSights] = useState<Sight[]>([]);
  const [startPoint, setStartPoint] = useState<Pierse>(null);
  const [endPoint, setEndPoint] = useState<Pierse>(null);

  const allSights: Sight[] = JSON.parse(JSON.stringify(sigths));
  const allPierses: Pierse[] = JSON.parse(JSON.stringify(pierses));

  const onSightClickHandle = (id: number) => {
    const ifAlreadyExisted = selectedSights.find((sight) => sight.id === id);
    if (ifAlreadyExisted) {
      setSelectedSights((prevState) => prevState.filter((sight) => sight.id !== ifAlreadyExisted.id));
    } else setSelectedSights((prevState) => [...prevState, allSights.find((elem) => elem.id === id)]);
  };
  const onPierseCkickHandle = (clickElement: Pierse) => {
    if (!startPoint && !endPoint) {
      setStartPoint(clickElement);
    } else if (!endPoint && startPoint) {
      if (JSON.stringify(clickElement.id) === JSON.stringify(startPoint.id)) {
        setStartPoint(null);
      } else {
        setEndPoint(clickElement);
      }
    } else if (endPoint && !startPoint) {
      if (JSON.stringify(clickElement.id) === JSON.stringify(endPoint.id)) {
        setEndPoint(null);
      } else {
        setStartPoint(clickElement);
      }
    } else if (endPoint && startPoint) {
      if (JSON.stringify(clickElement.id) === JSON.stringify(endPoint.id)) {
        setEndPoint(null);
        // setList((prevState) => prevState.map((point)=>JSON.stringify(point.coordinates)===JSON.stringify(clickElement.coordinates) ? {...point, selected: false} : point))
      } else if (JSON.stringify(clickElement.id) === JSON.stringify(startPoint.id)) {
        setStartPoint(null);
        // setList((prevState) => prevState.map((point)=>JSON.stringify(point.coordinates)===JSON.stringify(clickElement.coordinates) ? {...point, selected: false} : point))
      }
    }
  };

  return (
    <Page
      title={"Создать маршрут"}
      description={"Создайте свой собственный маршрут и наслаждайтесь прогулкой по воде!"}
    >
      <Container maxWidth={"lg"} className={classes.mainContainer}>
        <Box>
          <h2>Построить водный маршрут</h2>
          <p>
            Для того, чтобы построить свой маршрут, вам необходимо указать начальную и конечную точки маршрута, а также
            выбрать из предложенного списка, какие достопримечательности вы бы хотели увидеть с воды.
          </p>
        </Box>
        <Box>
          <h3>1. Выберите, какие достопримечательности вы бы хотели увидеть с воды </h3>
          <Viewer
            style={{ width: "100%", height: "800px" }}
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
                allPierses[Math.floor(allPierses.length / 2)].lon,
                allPierses[Math.floor(allPierses.length / 2)].lat,
                3000,
              )}
              once={true}
            />
            {allSights.map((elem: Sight) => (
              <MapPoint
                data={elem}
                onClickHandler={() => onSightClickHandle(elem.id)}
                isSelected={false}
                isSight={true}
              />
            ))}
          </Viewer>
          <ul>
            {selectedSights.length ? (
              selectedSights.map((elem, key) => (
                <li key={key}>
                  <p>
                    {elem.title} {elem.lat} {elem.lon}
                  </p>
                </li>
              ))
            ) : (
              <p>Вы не выбрали ни одной достопримечательности</p>
            )}
          </ul>
          {/*<ul>*/}
          {/*  {selectedSights.length ? (*/}
          {/*  ) : (<p>Вы не выбрали ни одной достопримечательности</p>)}*/}
          {/*</ul>*/}
        </Box>
        <Box>
          <h3>2. Выберите начальную и конечную точки маршрута на карте</h3>
          <p>
            Начальная точка: {startPoint?.lat}, {startPoint?.lon}
          </p>
          <p>
            Конечная точка: {endPoint?.lat}, {endPoint?.lon}
          </p>
        </Box>
        <Viewer
          style={{ width: "100%", height: "800px" }}
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
              allPierses[Math.floor(allPierses.length / 2)].lon,
              allPierses[Math.floor(allPierses.length / 2)].lat,
              3000,
            )}
            once={true}
          />
          {allPierses.map((elem: Pierse) => (
            <MapPoint
              data={elem}
              onClickHandler={() => onPierseCkickHandle(elem)}
              isSight={false}
              isSelected={elem.id === startPoint?.id || elem.id === endPoint?.id}
            />
          ))}
        </Viewer>
        <Box paddingTop={"1em"}>
          <Button variant={"outlined"}>Построить маршрут</Button>
        </Box>
      </Container>
    </Page>
  );
};

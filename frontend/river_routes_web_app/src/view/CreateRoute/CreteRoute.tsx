import React, { useEffect, useState } from "react";
import { Page } from "@src/components/Page/Page";
import { Box, Button, CircularProgress, Container, makeStyles, Snackbar, TextField } from "@material-ui/core";
import { Camera, CameraFlyTo, Entity, Polyline, PolylineCollection, Viewer } from "resium";
import pierses from "@src/data/pierses.json";
import sigths from "@src/data/sights.json";
import {
  CREATE_ROUTE_R,
  GET_ALL_PIERSES_R,
  GET_ALL_ROUTES_R,
  GET_ALL_SIGHTS_R,
  Pierse,
  Sight,
} from "@src/store/route/routeTypes";
import { Cartesian3, Color, InterpolationAlgorithm } from "cesium";
import * as Cesium from "cesium";
import { MapPoint } from "@src/components/MapPoint/MapPoint";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { createRoute, getAllPierses, getAllRoutes, getAllSights } from "@src/store/route/routeActions";
import { useDebounce } from "@src/utils/useDebounce";
import { TextFields } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    padding: "3em",
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//
export const CreateRoute = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedSights, setSelectedSights] = useState<Sight[]>([]);
  const [startPoint, setStartPoint] = useState<Pierse>(null);
  const [endPoint, setEndPoint] = useState<Pierse>(null);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const allSights: Sight[] = useSelector((state: any) => state.route.allSights);
  const allPierses: Pierse[] = useSelector((state: any) => state.route.allPierses);

  // const isLoadingPierses = useSelector((state: any) => state.route.isLoadingPierses);
  // const isLoadingSights = useSelector((state: any) => state.route.isLoadingSights);
  //
  // const debouncedIsLoadingPierses = useDebounce(isLoadingPierses, 300);
  // const debouncedIsLoadingSights = useDebounce(isLoadingSights, 300);

  const isLoading = useSelector((state: any) => state.route.isLoading);
  const debounsedIsLoading = useDebounce(isLoading, 300);
  const allRoutes: Pierse[] = useSelector((state: any) => state.route.allRoutes);

  useEffect(() => {
    if (selectedSights.length && startPoint && endPoint) {
      if (!debounsedIsLoading && allRoutes.length) {
        window.location.href = `/routes/${allRoutes[allRoutes.length - 1].id}`;
      }
    }
  }, [debounsedIsLoading, allRoutes]);

  useEffect(() => {
    if (!allPierses.length) {
      dispatch({ type: GET_ALL_SIGHTS_R });
      dispatch<any>(getAllPierses());
    }
    if (!allSights.length) {
      dispatch({ type: GET_ALL_PIERSES_R });
      dispatch<any>(getAllSights());
    }
    if (!allRoutes.length) {
      dispatch({ type: GET_ALL_ROUTES_R });
      dispatch<any>(getAllRoutes());
    }
  }, [allPierses, allSights, allRoutes]);

  const onSightClickHandle = (id: number) => {
    const ifAlreadyExisted = selectedSights.find((sight) => sight.id === id);
    if (ifAlreadyExisted) {
      setSelectedSights((prevState) => prevState.filter((sight) => sight.id !== ifAlreadyExisted.id));
    } else setSelectedSights((prevState) => [...prevState, allSights.find((elem) => elem.id === id)]);
  };

  const onClickCreateRouteHandler = () => {
    if (selectedSights.length && startPoint && endPoint) {
      dispatch({ type: CREATE_ROUTE_R });
      dispatch<any>(createRoute(startPoint, endPoint, selectedSights, title));
    } else {
      setOpen(true);
    }
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
      {allSights.length && allPierses.length ? (
        <Container maxWidth={"lg"} className={classes.mainContainer}>
          <Box>
            <h2>Построить водный маршрут</h2>
            <p>
              Для того, чтобы построить свой маршрут, вам необходимо указать начальную и конечную точки маршрута, а
              также выбрать из предложенного списка, какие достопримечательности вы бы хотели увидеть с воды.
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
                    <p>{elem.title}</p>
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
          <Box>
            <h3>3. Придумайте название маршрута</h3>
            <TextField placeholder={"Введите название маршрута"} onChange={(e) => setTitle(e.target.value)} />
          </Box>
          <Box paddingTop={"1em"}>
            <Button variant={"outlined"} onClick={onClickCreateRouteHandler}>
              {debounsedIsLoading ? <CircularProgress /> : "Построить маршрут"}
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="error">
              Вы не выбрали необходимые точки маршрута
            </Alert>
          </Snackbar>
        </Container>
      ) : (
        <Container maxWidth={"lg"} style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      )}
    </Page>
  );
};

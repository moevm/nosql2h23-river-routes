import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { GET_ALL_ROUTES_R, Route } from "@src/store/route/routeTypes";
import routes from "@src/data/routes.json";
import { useDebounce } from "@src/utils/useDebounce";
import { exportFile, uploadFile } from "@src/utils/toolFunctions";
import { Page } from "@src/components/Page/Page";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes } from "@src/store/route/routeActions";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 30,
  },
  formControl: {
    minWidth: 120,
  },
}));

interface FormState {
  routeName: string;
  date: string;
}

const defaultState = (): FormState => ({
  routeName: "",
  date: "",
});

export const RoutesArchive = () => {
  const _allRoutes: Route[] = useSelector((state: any) => state.route.allRoutes);
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);
  const classes = useStyles();
  const [form, setForm] = useState(defaultState());
  const debouncedFilterValue = useDebounce(form, 200);
  const isLoadingRoutes = useSelector((state: any) => state.route.isLoadingRoutes);
  const debouncedIsLoadingRoutes = useDebounce(isLoadingRoutes, 300);
  const dispatch = useDispatch();
  const [filteredRoutes, setFiltetedRoutes] = useState<Route[]>(allRoutes);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  useEffect(() => {
    if (!_allRoutes.length) {
      dispatch({ type: GET_ALL_ROUTES_R });
      dispatch<any>(getAllRoutes());
    } else {
      setAllRoutes((prevState) => prevState.concat(_allRoutes));
    }
  }, [debouncedIsLoadingRoutes]);

  const onFilterChangeHandler = (e: any) => {
    const { name, value } = e.target;
    const newValue = name === "date" ? value.split("-").reverse().toString().replace(/,/g, ".") : value;

    setForm((prevState) => ({ ...prevState, [name]: newValue }));
  };

  useEffect(() => {
    let endCoordinates = endPoint ? allRoutes.find((route) => route.id === endPoint) : null;
    let startCoordinates = startPoint ? allRoutes.find((route) => route.id === startPoint) : null;

    if (allRoutes.length) {
      setFiltetedRoutes(
        allRoutes.filter(
          (elem) =>
            elem.name.includes(debouncedFilterValue.routeName) &&
            (debouncedFilterValue.date !== "" ? elem.createAt.toString() == debouncedFilterValue.date : true) &&
            (startCoordinates
              ? elem.startPoint.lat === startCoordinates.startPoint.lat &&
                elem.startPoint.lon === startCoordinates.startPoint.lon
              : true) &&
            (endCoordinates
              ? elem.endPoint.lat === endCoordinates.endPoint.lat && elem.endPoint.lon === endCoordinates.endPoint.lon
              : true),
        ),
      );
    }
  }, [debouncedFilterValue, startPoint, endPoint]);

  const onImportHandler = async () => {
    const newData: Route[] = JSON.parse(await uploadFile());
    setAllRoutes((prevState) => prevState.concat(newData));
  };

  const onExportHandler = () => {
    exportFile(allRoutes);
  };

  return (
    <Page title={"Рекомендации"} description={"Ознакомьтесь с рекомендуемыми маршрутами"}>
      <Container style={{ height: "100%" }}>
        <section>
          <Grid container spacing={4} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Grid item lg={4}>
              <h2>Рекомендации</h2>
            </Grid>
            <Grid item lg={6}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant={"outlined"} style={{ marginRight: "1rem" }} onClick={onImportHandler}>
                  Импорт маршрута
                </Button>
                <Button variant={"outlined"} onClick={onExportHandler}>
                  Экспорт маршрута
                </Button>
              </div>
            </Grid>
          </Grid>
        </section>
        <section>
          <Grid container spacing={3}>
            <Grid item md={12} lg={4}>
              <FormControl fullWidth variant={"outlined"} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label1">Выберите начало маршрута</InputLabel>
                <Select
                  labelId={"demo-simple-select-outlined-label1"}
                  label={"Выберите начало маршрута"}
                  value={startPoint ? startPoint : ""}
                  onChange={(e: any) => {
                    setStartPoint(e.target.value);
                  }}
                >
                  <MenuItem value={null}>Все</MenuItem>
                  {allRoutes.length &&
                    allRoutes.map((route, num) => (
                      <MenuItem value={route.id} key={num}>
                        {route.startPoint.lat},{route.startPoint.lon}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} lg={4}>
              <FormControl fullWidth variant={"outlined"} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label2">Выберите конец маршрута</InputLabel>
                <Select
                  labelId={"demo-simple-select-outlined-label2"}
                  label={"Выберите конец маршрута"}
                  value={endPoint ? endPoint : ""}
                  onChange={(e: any) => {
                    setEndPoint(e.target.value);
                  }}
                >
                  <MenuItem value={null}>Все</MenuItem>
                  {allRoutes.length &&
                    allRoutes.map((route, num) => (
                      <MenuItem value={route.id} key={num}>
                        {route.endPoint.lat},{route.endPoint.lon}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={12} lg={3}>
              <TextField
                variant={"outlined"}
                type={"date"}
                name={"date"}
                onChange={onFilterChangeHandler}
                placeholder={"Дата создания"}
              ></TextField>
            </Grid>
            <Grid item md={12} lg={8}>
              <TextField
                placeholder={"Напишите название маршрута"}
                onChange={onFilterChangeHandler}
                name={"routeName"}
                variant={"outlined"}
                fullWidth={true}
              ></TextField>
            </Grid>
          </Grid>
        </section>
        <section>
          {filteredRoutes.length ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название маршрута</TableCell>
                  <TableCell>Координаты начала</TableCell>
                  <TableCell>Координаты конца</TableCell>
                  <TableCell>Дата создания</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoutes.length ? (
                  filteredRoutes.map((route, number) => (
                    <TableRow key={number} onClick={() => (window.location.href = `/routes/${route.id}`)}>
                      <TableCell className={classes.tableCell}>{route.name}</TableCell>
                      <TableCell className={classes.tableCell}>
                        {route.startPoint.lat} {route.startPoint.lon}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {route.endPoint.lat} {route.endPoint.lon}
                      </TableCell>
                      <TableCell className={classes.tableCell}>{route.createAt.toString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>Маршрута с такими данными не найдено</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Container maxWidth={"lg"} style={{ display: "flex", justifyContent: "center", padding: "5em" }}>
              <CircularProgress />
            </Container>
          )}
        </section>
      </Container>
    </Page>
  );
};

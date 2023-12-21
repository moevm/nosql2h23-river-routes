import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { Route } from "@src/store/route/routeTypes";
import routes from "@src/data/routes.json";
import { useDebounce } from "@src/utils/useDebounce";
import { exportFile, uploadFile } from "@src/utils/toolFunctions";
import { Page } from "@src/components/Page/Page";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 30,
  },
  formControl: {
    margin: theme.spacing(1),
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
  const [allRoutes, setAllRoutes] = useState<Route[]>(JSON.parse(JSON.stringify(routes)));
  const classes = useStyles();
  const [form, setForm] = useState(defaultState());
  const debouncedFilterValue = useDebounce(form, 200);

  const [filteredRoutes, setFiltetedRoutes] = useState<Route[]>(allRoutes);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  useEffect(() => {
    if (_allRoutes.length) {
      setAllRoutes((prevState) => prevState.concat(_allRoutes));
    }
  }, [_allRoutes]);

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
              ? elem.startLat === startCoordinates.startLat && elem.startLon === startCoordinates.startLon
              : true) &&
            (endCoordinates ? elem.endLat === endCoordinates.endLat && elem.endLon === endCoordinates.endLon : true),
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
          <Grid container spacing={2}>
            {allRoutes.length ? (
              <>
                <Grid item md={12} lg={5}>
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
                      {allRoutes.map((pierse, num) => (
                        <MenuItem value={pierse.id} key={num}>
                          {pierse.startLat},{pierse.startLon}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} lg={5}>
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
                      {allRoutes.map((pierse, num) => (
                        <MenuItem value={pierse.id} key={num}>
                          {pierse.endLat},{pierse.endLon}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            ) : null}
            <Grid item md={12} lg={3}>
              <TextField
                variant={"outlined"}
                type={"date"}
                name={"date"}
                onChange={onFilterChangeHandler}
                placeholder={"Дата создания"}
              ></TextField>
            </Grid>
            <Grid item md={12} lg={5}>
              <TextField
                placeholder={"Поиск"}
                onChange={onFilterChangeHandler}
                name={"routeName"}
                variant={"outlined"}
              ></TextField>
            </Grid>
          </Grid>
        </section>
        <section>
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
                      {route.startLat} {route.startLon}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {route.endLat} {route.endLon}
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
        </section>
      </Container>
    </Page>
  );
};

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
import { getAllRoutes, importRoutes } from "@src/store/route/routeActions";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 20,
  },
  formControl: {
    minWidth: 120,
  },
}));

interface FormState {
  routeName: string;
  date1: string;
  date2: string;
}

const defaultState = (): FormState => ({
  routeName: "",
  date1: "",
  date2: "",
});

export const RoutesArchive = () => {
  const allRoutes: Route[] = useSelector((state: any) => state.route.allRoutes);
  // const [allRoutes, setAllRoutes] = useState<Route[]>(_allRoutes);
  const classes = useStyles();
  const [form, setForm] = useState<FormState>(defaultState());
  const debouncedFilterValue = useDebounce(form, 200);
  const isLoadingRoutes = useSelector((state: any) => state.route.isLoadingRoutes);
  const debouncedIsLoadingRoutes = useDebounce(isLoadingRoutes, 300);
  const dispatch = useDispatch();
  const [filteredRoutes, setFiltetedRoutes] = useState<Route[]>([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  useEffect(() => {
    dispatch({ type: GET_ALL_ROUTES_R });
    dispatch<any>(getAllRoutes());
  }, []);

  useEffect(() => {
    if (!allRoutes.length) {
      dispatch({ type: GET_ALL_ROUTES_R });
      dispatch<any>(getAllRoutes());
    } else {
      setFiltetedRoutes(allRoutes);
    }
    console.log(allRoutes);
  }, [allRoutes]);

  const onFilterChangeHandler = (e: any) => {
    const { name, value } = e.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    let endCoordinates = endPoint ? allRoutes.find((route) => route.id === endPoint) : null;
    let startCoordinates = startPoint ? allRoutes.find((route) => route.id === startPoint) : null;

    const ifInRange = (d1: Date, d2: Date, curr: Date) => {
      // console.log(curr.getTime(), d1.getTime(), d2.getTime());

      return d1.getTime() && d2.getTime()
        ? curr.getTime() >= d1.getTime() && curr.getTime() <= d2.getTime()
        : d1.getTime()
        ? curr.getTime() >= d1.getTime()
        : curr.getTime() <= d2.getTime();
    };

    if (allRoutes.length) {
      setFiltetedRoutes(
        allRoutes.filter(
          (elem) =>
            elem.name.toLowerCase().includes(debouncedFilterValue.routeName.toLowerCase()) &&
            (debouncedFilterValue.date1 !== "" || debouncedFilterValue.date2 !== ""
              ? ifInRange(
                  new Date(debouncedFilterValue.date1),
                  new Date(debouncedFilterValue.date2),
                  new Date(elem.createAt),
                )
              : true) &&
            (startPoint ? elem.startPoint.address === startPoint : true) &&
            (endPoint ? elem.endPoint.address === endPoint : true),
        ),
      );
    }
  }, [debouncedFilterValue, startPoint, endPoint]);

  const onImportHandler = async () => {
    const newData: Route[] = JSON.parse(await uploadFile());
    dispatch<any>(importRoutes(newData));
    // setAllRoutes((prevState) => prevState.concat(newData));
  };

  const onExportHandler = () => {
    exportFile(allRoutes);
  };

  return (
    <Page title={"Рекомендации"} description={"Ознакомьтесь с рекомендуемыми маршрутами"}>
      <Container>
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
                    allRoutes
                      .reduce((res: Route[], currentValue, currentIndex) => {
                        return res.find((elem) => elem.startPoint.address === currentValue.startPoint.address)
                          ? res
                          : [...res, currentValue];
                      }, [])
                      .map((route, num) => (
                        <MenuItem value={route.startPoint.address} key={num}>
                          {route.startPoint.address}
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
                    allRoutes
                      .reduce((res: Route[], currentValue, currentIndex) => {
                        return res.find((elem) => elem.endPoint.address === currentValue.endPoint.address)
                          ? res
                          : [...res, currentValue];
                      }, [])
                      .map((route, num) => (
                        <MenuItem value={route.endPoint.address} key={num}>
                          {route.endPoint.address}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item container md={12} lg={8} spacing={4}>
              <Grid item lg={3}>
                <TextField
                  variant={"outlined"}
                  type={"date"}
                  name={"date1"}
                  onChange={onFilterChangeHandler}
                  placeholder={"Дата создания От"}
                ></TextField>
              </Grid>
              <Grid item lg={3}>
                <TextField
                  variant={"outlined"}
                  type={"date"}
                  name={"date2"}
                  onChange={onFilterChangeHandler}
                  placeholder={"Дата создания До"}
                ></TextField>
              </Grid>
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
                  <TableCell>Адрес начала</TableCell>
                  <TableCell>Адрес конца</TableCell>
                  <TableCell>Дата создания</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoutes.length ? (
                  filteredRoutes.map((route, number) => (
                    <TableRow key={number} onClick={() => (window.location.href = `/routes/${route.id}`)}>
                      <TableCell className={classes.tableCell}>{route.name}</TableCell>
                      <TableCell className={classes.tableCell}>
                        {route.startPoint.address}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {route.endPoint.address}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {route.createAt.toString().split("T")[0].split("-").reverse().toString().replace(/,/g, ".")}
                      </TableCell>
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

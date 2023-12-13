import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Route } from "@src/store/route/routeTypes";
import routes from "@src/data/routes.json";
import { TextFields } from "@material-ui/icons";
import { useDebounce } from "@src/utils/useDebounce";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 30,
  },
}));

export const RoutesArchive = () => {
  const [allRoutes, setAllRoutes] = useState<Route[]>(JSON.parse(JSON.stringify(routes)));
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState("");
  const debouncedFilterValue = useDebounce(filterValue, 200);
  const onFilterChangeHandler = (e: any) => {
    setFilterValue(e.target.value);
  };

  function uploadFile(): Promise<string> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";

      input.onchange = () => {
        const file = input.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const contents = e.target.result as string;
            resolve(contents);
          };
          reader.onerror = (e) => {
            reject(new Error("Failed to read file"));
          };
          reader.readAsText(file);
        } else {
          reject(new Error("No file selected"));
        }
      };

      input.click();
    });
  }
  const onImportHandler = async () => {
    const newData: Route[] = JSON.parse(await uploadFile());
    setAllRoutes((prevState) => prevState.concat(newData));
  };

  const onExportHandler = () => {
    let blob = new Blob([JSON.stringify(allRoutes)], { type: "json" });

    let a = document.createElement("a");
    a.download = "data";
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["json", a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1500);
    return false;
  };

  return (
    <Container style={{ height: "100%" }}>
      <section>
        <Grid container spacing={4} direction={"row"} alignItems={"center"}>
          <Grid item lg={4}>
            <h2>Архив маршрутов</h2>
          </Grid>
          <Grid item lg={6}>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
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
        <Box>
          <TextField placeholder={"Поиск"} onChange={onFilterChangeHandler} variant={"outlined"}></TextField>
        </Box>
      </section>
      <section>
        <Table>
          <TableHead>
            <TableCell>Название маршрута</TableCell>
            <TableCell>Координаты начала</TableCell>
            <TableCell>Координаты конца</TableCell>
            <TableCell>Дата создания</TableCell>
          </TableHead>
          <TableBody>
            {allRoutes
              .filter((elem) => elem.name.includes(debouncedFilterValue))
              .map((route, number) => (
                <TableRow key={number}>
                  <TableCell className={classes.tableCell}>{route.name}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {route.startLat} {route.startLon}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {route.endLat} {route.endLon}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{route.createAt.toString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </Container>
  );
};

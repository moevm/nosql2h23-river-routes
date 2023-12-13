import React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Route } from "@src/store/route/routeTypes";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 30,
  },
}));

export const RoutesArchive = () => {
  const routes: Route[] = [];
  const classes = useStyles();
  const onImportHandler = () => {
    return false;
  };

  const onExportHandler = () => {
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
        <Table>
          <TableHead>
            <TableCell>Название маршрута</TableCell>
            <TableCell>Координаты начала</TableCell>
            <TableCell>Координаты конца</TableCell>
            <TableCell>Дата создания</TableCell>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow>
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

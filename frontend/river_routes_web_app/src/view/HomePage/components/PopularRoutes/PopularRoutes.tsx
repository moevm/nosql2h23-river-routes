import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import {PopularRoutesSpin} from "./components/PopularRoutesSpin/PopularRoutesSpin";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
  },
  titleContainer: {
    width: "80%"
  },
  title: {
    fontSize: "40px",
    fontWeight: 400,
    letterSpacing: "1.5px",
  },
}));

export const PopularRoutes = () => {
  const classes = useStyles();
  return <Box className={classes.root} display={"flex"} flexDirection={"column"} justifyContent={"flex-end"}>
    <p className={classes.title}>
      Популярные маршруты
    </p>
    <PopularRoutesSpin/>
  </Box>;
};

export default PopularRoutes;

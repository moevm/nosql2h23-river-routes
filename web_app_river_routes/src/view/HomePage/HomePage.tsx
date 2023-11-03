import React from "react";
import {Box, Paper} from "@material-ui/core";
import {useStyles} from "./style";
import {Description} from "./components/Description";
import FAQ from "./components/FAQ/FAQ";
import PopularRoutes from "@src/view/HomePage/components/PopularRoutes/PopularRoutes";

export const HomePage = () => {
  const classes = useStyles();
  return <Paper className = {classes.root}>
    <Box className={classes.topImage} style={{backgroundColor: "#b7b7b7", width: "100%"}}>
      <div className={classes.titleDiv}>
        <p className={classes.title}>
          ЧЕРЕЗ ПИТЕР
          ПО ВОДЕ
        </p>
      </div>
      <div className={classes.subtitleDiv}>
        <div className={classes.subtitle}>
          Выбери свой маршрут
        </div>
      </div>
    </Box>
    <Description/>
    <PopularRoutes/>
    <FAQ/>
  </Paper>;
};

export default HomePage;

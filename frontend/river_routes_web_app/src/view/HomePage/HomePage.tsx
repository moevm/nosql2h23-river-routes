import React from "react";
import {Box, Paper} from "@material-ui/core";
import {useStyles} from "./style";
import {Description} from "@src/view/HomePage/components/Description";
import FAQ from "@src/view/HomePage/components/FAQ/FAQ";
import PopularRoutes from "@src/view/HomePage/components/PopularRoutes/PopularRoutes"
import  TopImage  from "@src/images/home_page_images/top_image.png"

export const HomePage = () => {
  const classes = useStyles();
  return <Paper className = {classes.root}>
    <Box className={classes.topImage} style={{backgroundImage: `url(${TopImage})`, backgroundRepeat: "no-repeat", backgroundPosition:"center", backgroundSize: "cover", width: "100%"}}>
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

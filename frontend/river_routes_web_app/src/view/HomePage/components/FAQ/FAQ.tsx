import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import {FaqAccordion} from "./components/FaqAccordion";

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


export const FAQ = () => {
  const classes = useStyles();

  return <Box className={classes.root} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
    <Box>
      <div className={classes.titleContainer}>
        <p className={classes.title}>
        Вы не спрашивали,
        но мы расскажем
        </p>
      </div>
      <Box>
        <FaqAccordion summary={"Маршруты бесплатные?"} details={"Да! Все маршруты бесплатные. Можно построить любой маршрут, который Вам понравится."} style={null}/>
        <FaqAccordion summary={"Маршруты бесплатные?"} details={"Да! Все маршруты бесплатные. Можно построить любой маршрут, который Вам понравится."} style={null}/>
        <FaqAccordion summary={"Маршруты бесплатные?"} details={"Да! Все маршруты бесплатные. Можно построить любой маршрут, который Вам понравится."} style={{borderBottom: "1px solid #6E6E6E"}}/>
      </Box>
    </Box>
    <Box>
      <div style={{width: "542px", height: "652px", backgroundColor: "grey"}}>

      </div>
    </Box>
  </Box>;
};

export default FAQ;

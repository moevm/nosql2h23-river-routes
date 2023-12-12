import React from "react";
import {Box, Grid, makeStyles, Theme} from "@material-ui/core";
import DescrImage from "@src/images/home_page_images/descr_image.png"
export const useStyles = makeStyles((theme: Theme)=> ({
  title: {
    fontSize: "40px",
    fontWeight: 400,
    letterSpacing: "1.5px",
    paddingLeft: "1.1em",
  },
  description: {
    paddingLeft: "1.9em",
    fontSize: "25px"
  },
  number: {
    textAlign: "center",
    fontFamily: "IBM Plex Sans",
    fontSize: "70px",
    fontStyle: "normal",
    fontWeight: 500,
    lineWeight: "130%",
    color: "#000000",
    margin: 0,
  },
  numberDescrText: {
    textAlign: "center",
    fontFamily: "IBM Plex Sans",
    fontSize: "25px",
    fontStyle: "normal",
    fontWeight: 700,
    lineWeight: "130%",
    color: "#000000",
    margin: 0,
  },
}));

export const Description = () => {
  const classes = useStyles();
  return <Box display={"flex"} flexDirection={"column"} paddingBottom={"3em"}>
    <div>
      <p className={classes.title}>
        О проекте
      </p>
    </div>
    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
      <Box display={"flex"} flexDirection={"column"}  width={"50%"}>
        <div className={classes.description}>
          <p>Санкт-Петербург является одним из самых красивых городов в мире. Множество туристов ежегодно приезжают насладиться богатейшим историческим наследием. Парки, дворцы, храмы, музеи - огромное количество достопримечательностей находятся буквально на каждом шагу.</p>

          <p>А что если взглянуть на все эти места с нового места - с воды? Не важно, живешь ты в Питере всю свою жизнь или это твой первый день - мы поделимся с тобой водными маршрутами, которые точно не оставят тебя равнодушным и смогут показать Питер с совершенно новой стороны.</p>
        </div>
        <div style={{backgroundImage: `url(${DescrImage})`, width: "700px", height: "265px"}}/>
      </Box>
      <Grid container spacing={1} style={{display: "flex", height: "50%"}} justifyContent={"center"} alignItems={"center"}>
        <Grid item md={12} lg={12} style={{padding: 0, width: "100px"}}>
          <div>
            <p style={{textAlign: "center"}} className={classes.number}>
              500
            </p>
            <p style={{textAlign: "center"}} className={classes.numberDescrText}>
              км водных путей
            </p>
          </div>
        </Grid>
        <Grid item md={12} lg={12} style={{padding: 0, width: "100px"}}>
          <div>
            <p style={{textAlign: "center"}} className={classes.number}>
              400
            </p>
            <p style={{textAlign: "center"}} className={classes.numberDescrText}>
              музеев
            </p>
          </div>
        </Grid>
        <Grid item md={12} lg={12} style={{padding: 0, width: "100px"}}>
          <div>
            <p style={{textAlign: "center"}} className={classes.number}>
              130
            </p>
            <p style={{textAlign: "center"}} className={classes.numberDescrText}>
              памятников
            </p>
          </div>
        </Grid>
        <Grid item md={12} lg={12} style={{padding: 0, width: "100px"}}>
          <div>
            <p style={{textAlign: "center"}} className={classes.number}>
              650
            </p>
            <p style={{textAlign: "center"}} className={classes.numberDescrText}>
              исторических зданий
            </p>
          </div>
        </Grid>
      </Grid>

    </Box>
  </Box>;
};

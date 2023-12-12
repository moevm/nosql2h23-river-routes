import React from "react";
import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { useStyles } from "./style";

export const Footer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box width={"90%"} display={"flex"} justifyContent={"space-evenly"} flexDirection={"row"}>
        <Grid container spacing={1} style={{ margin: 0, height: "100%" }}>
          <Grid item lg={6} md={6}>
            <p className={classes.companyName}>RiverRoutes</p>
            <p className={classes.addInfo}>Since 2023</p>
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ margin: 0, height: "100px" }}>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <p className={classes.descrMainText}>Связаться</p>
          </Grid>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <a href={"nsstrannikova@mail.ru"} className={classes.mainText}>
              nsstrannikova@mail.ru
            </a>
          </Grid>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <a href={"nikitaef2002@gmail.com"} className={classes.mainText}>
              nikitaef2002@gmail.com
            </a>
          </Grid>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <a href={"catchexc@gmail.com"} className={classes.mainText}>
              catchexc@gmail.com
            </a>
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ margin: 0, height: "100px" }}>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <p className={classes.descrMainText}>Локация</p>
          </Grid>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <span className={classes.mainText}>ул. Профессора Попова, 5</span>
          </Grid>
          <Grid item lg={12} md={12} style={{ padding: 0, height: "30px" }}>
            <span className={classes.mainText}>Санкт-Петербург, Россия</span>
          </Grid>
        </Grid>
        <Grid container spacing={1} style={{ margin: 0, height: "100px" }}>
          <Grid item lg={12} md={12} style={{ padding: 0 }}>
            <span className={classes.mainText}>Хотите получать самые свежие новости и эксклюзивные предложения?</span>
          </Grid>
          <Grid item lg={12} md={12} style={{ padding: 0 }}>
            <div>
              <input placeholder={"Введите почту"} className={classes.inputField}></input>
              <Button variant={"contained"} size={"small"} className={classes.button}>
                Подписаться
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

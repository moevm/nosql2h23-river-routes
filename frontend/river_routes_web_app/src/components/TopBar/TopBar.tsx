import React from "react";
import {Box} from "@material-ui/core";
import {useStyles} from "./style";

export const TopBar = () => {
  const classes = useStyles();
  return <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} className={classes.root}>
    <div style={{width: "20%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <span className={classes.name}>
        RiverRoutes
      </span>
    </div>
    <div className={classes.menuItemsContainer}>
      <span className={classes.menuItems}>
        Главная
      </span>
      <span className={classes.menuItems}>
        Водные маршруты
      </span>
      <span className={classes.menuItems}>
        О Проекте
      </span>
      <span className={classes.menuItems}>
        FAQ
      </span>
    </div>
  </Box>;
};
import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./style";
import { Link } from "react-router-dom";
export const TopBar = () => {
  const classes = useStyles();
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      className={classes.root}
    >
      <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link className={classes.name} to={"/"}>
          RiverRoutes
        </Link>
      </div>
      <div className={classes.menuItemsContainer}>
        <span className={classes.menuItems}>Главная</span>
        <Link className={classes.menuItems} to={"/archive"}>
          Водные маршруты
        </Link>
        <span className={classes.menuItems}>О Проекте</span>
        <span className={classes.menuItems}>FAQ</span>
      </div>
    </Box>
  );
};

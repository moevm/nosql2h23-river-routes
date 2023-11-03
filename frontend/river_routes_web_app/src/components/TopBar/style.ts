import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: "transparent",
    height: "100px",
  },
  name: {
    textAlign: "center",
    fontFamily: "IBM Plex Sans",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 700,
    lineWeight: "130%",
    color: "#000000",
    "&:hover": {
      cursor: "pointer",
    }
  },
  menuItemsContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  menuItems: {
    color: "#000",
    textAlign: "center",
    fontFamily: "IBM Plex Sans",
    fontSize: "25px",
    fontStyle: "normal",
    fontWeight: 400,
    lineWeight: "130%", /* 32.5px */
    "&:hover": {
      cursor: "pointer",
    }
  }
}));

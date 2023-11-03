import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  topImage: {
    width: "100%",
    height: "700px",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "3em",
  },
  title: {
    textAlign: "right",
    fontSize: "70px",
    marginTop: 0,
    paddingTop: "3em",
    width: "50%"
  },
  subtitleDiv: {
    display: "flex",
    paddingLeft: "10em",
  },
  subtitle: {
    border: "1px solid #000",
    background: "rgba(255, 255, 255, 0.00)",
    width: "275px",
    height: "52px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    }
  }
}));

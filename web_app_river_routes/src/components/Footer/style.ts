import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme)=>({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "189px",
    backgroundColor: "#585858",

  },
  companyName: {
    color: "#FFF",
    fontFamily: "IBM Plex Sans",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "130%", /* 39px */
    marginBottom: 0,
  },

  addInfo: {
    color: "#CDCDCD",
    fontFamily: "IBM Plex Sans",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "130%", /* 39px */
    marginTop: 0
  },
  mainText: {
    color: "#FFF",
    fontFamily: "IBM Plex Sans",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "130%", /* 39px */
    marginTop: 0
  },

  descrMainText: {
    color: "#898989",
    fontFamily: "IBM Plex Sans",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "130%", /* 39px */
    marginTop: 0,
  },
  inputField: {
    fontSize: "12px",
    width: "60%",
    color: "#FFF",
    backgroundColor: "transparent",
    border: "1px solid #CDCDCD",
    padding: "4px",
    "&:focus":{
      borderColor: "#fbfafa",
      outline: "none"
    },
    "&::placeholder": {
      color: "#FFF",
      fontSize: "12px",
    },
  },

  button: {
    fontSize: "12px",
    textTransform: "none",
    width: "90px",
    height: "20px!important",
    minHeight: 0,
    minWidth: 0,
    marginLeft: "10px",
  },

}));

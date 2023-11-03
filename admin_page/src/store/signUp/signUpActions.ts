import {SIGN_UP} from "./signUpTypes";

export const signUp = (login: string, password: string) => {
  return (dispatch: any) => {
    if(login==="admin" && password === "admin")
      dispatch({type: SIGN_UP, payload: {login: login, password: password}});
    if(login==="Natasha"){
      console.log("ИДИ НАХУЙ НАТАША");
    }
    if(login === "Pasha"){
      console.log("ТЫ ПИДАРАС ПАША");
    }
  };
};

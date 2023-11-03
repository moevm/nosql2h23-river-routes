import {SIGN_UP} from "./signUpTypes";


const defaultState = {
  login: "",
  password: "",
  isAuth: true,
};

export const signUpReducer = ((state=defaultState, action: any) => {
  switch (action.type){
  case SIGN_UP:
    return {login: action.payload.login, password: action.payload.password, isAuth: true};
  default:
    return state;
  }
});

export default signUpReducer;

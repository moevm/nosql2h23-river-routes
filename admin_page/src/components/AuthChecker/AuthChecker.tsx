import React from "react";
import {useSelector} from "react-redux";
import {SignUpPage} from "../../view/SignUpPage/SignUpPage";

// eslint-disable-next-line react/prop-types
export const AuthChecker = ({children}:any) => {
  const isAuth = useSelector((state:any)=>state.signUp.isAuth);

  return isAuth ? children : <SignUpPage/>;
};

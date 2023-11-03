import {AuthChecker} from "../components/AuthChecker/AuthChecker";
import React from "react";
import {MainPage} from "./MainPage/MainPage";
export const AdminApp = () => {

  return <AuthChecker>
    <MainPage/>
  </AuthChecker>;
};

import React, {useState} from "react";
import {Box} from "@material-ui/core";


interface SignUpForm{
  login: string,
  password: string,
}

const initiateState = ():SignUpForm => {
  return {
    login: "",
    password: "",
  };
};

export const SignUpPage = () => {

  const [formState, setFormState] = useState<SignUpForm>(initiateState);

  return <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
    {"SASAT"}
  </Box>;
};

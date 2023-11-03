import React from "react";
import {TopBar} from "./components/TopBar/TopBar";
import {Footer} from "./components/Footer/Footer";
import HomePage from "./view/HomePage/HomePage";
export const RiverRoutesApp = () => {
  return <div style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
    <header style={{position: "absolute", width: "100vw"}}>
      <TopBar/>
    </header>
    <HomePage/>
    <footer >
      <Footer/>
    </footer>
  </div>;
};

export default RiverRoutesApp;

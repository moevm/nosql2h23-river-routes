import React from "react";

import { TopBar } from "./components/TopBar/TopBar";
import { Footer } from "./components/Footer/Footer";
import HomePage from "./view/HomePage/HomePage";

import { Route, Routes, useLocation } from "react-router-dom";
import { CreateRoute } from "@src/view/CreateRoute/CreteRoute";
import { Error } from "@src/view/Error/Error";
import { Box, Container } from "@material-ui/core";
import { RoutesArchive } from "@src/view/RoutesArchive/RoutesArchive";
export const RiverRoutesApp = () => {
  const { pathname } = useLocation();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100vw",
        height: pathname !== "/" ? "100vh" : "auto",
      }}
    >
      <header style={{ position: pathname === "/" ? "absolute" : "relative", width: "100vw" }}>
        <TopBar />
      </header>
      <Box style={{ padding: 0, width: "100%", height: "100%", display: "flex", justifyContent: "flex-start" }}>
        <Routes>
          <Route path={"*"} element={<Error />} />

          <Route path={"/"} element={<HomePage />} />

          <Route path={"/create_route"} element={<CreateRoute />} />
          <Route path={"/archive"} element={<RoutesArchive />} />
        </Routes>
      </Box>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RiverRoutesApp;

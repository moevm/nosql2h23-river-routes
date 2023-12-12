import React from "react";

import { TopBar } from "./components/TopBar/TopBar";
import { Footer } from "./components/Footer/Footer";
import HomePage from "./view/HomePage/HomePage";

import { Route, Routes, useLocation } from "react-router-dom";
import { CreateRoute } from "@src/view/CreateRoute/CreteRoute";
import { Error } from "@src/view/Error/Error";
import { Container } from "@material-ui/core";
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
        height: "100vh",
      }}
    >
      <header style={{ position: pathname === "/" ? "absolute" : "relative", width: "100vw" }}>
        <TopBar />
      </header>
      <Container maxWidth={false} style={{ padding: 0 }}>
        <Routes>
          <Route path={"*"} element={<Error />} />

          <Route path={"/"} element={<HomePage />} />

          <Route path={"/create_route"} element={<CreateRoute />} />
          <Route path={"/archive"} element={<RoutesArchive />} />
        </Routes>
      </Container>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RiverRoutesApp;

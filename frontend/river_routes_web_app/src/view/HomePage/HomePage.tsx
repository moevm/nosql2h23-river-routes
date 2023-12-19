import React from "react";
import { Box, Button, Paper } from "@material-ui/core";
import { useStyles } from "./style";
import { Description } from "@src/view/HomePage/components/Description";
import FAQ from "@src/view/HomePage/components/FAQ/FAQ";
import PopularRoutes from "@src/view/HomePage/components/PopularRoutes/PopularRoutes";
import TopImage from "@src/images/home_page_images/top_image.png";
import { Page } from "@src/components/Page/Page";
import { Link } from "react-router-dom";
import { ExistingSights } from "@src/view/HomePage/components/ExistingSights/ExistingSights";

export const HomePage = () => {
  const classes = useStyles();

  return (
    <Page description={"Добро пожаловать в лучший сервис по построению маршрутов!"} title={"Главная"}>
      <Paper className={classes.root}>
        <Box
          className={classes.topImage}
          style={{
            backgroundImage: `url(${TopImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
          }}
        >
          <div className={classes.titleDiv}>
            <p className={classes.title}>ЧЕРЕЗ ПИТЕР ПО ВОДЕ</p>
          </div>
          <div className={classes.subtitleDiv}>
            <Link className={classes.subtitle} to={"create_route"} style={{ textDecoration: "none" }}>
              Выбери свой маршрут
            </Link>
          </div>

          <div className={classes.subtitleDiv} style={{ marginTop: "0.5em" }}>
            <Link className={classes.subtitle} to={"archive"} style={{ textDecoration: "none" }}>
              Рекомендации
            </Link>
          </div>
        </Box>
        <Description />
        {/*<ExistingSights />*/}
        {/*<PopularRoutes />*/}
        <FAQ />
      </Paper>
    </Page>
  );
};

export default HomePage;

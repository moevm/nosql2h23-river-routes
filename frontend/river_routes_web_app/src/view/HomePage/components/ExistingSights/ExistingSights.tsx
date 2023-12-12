import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Sight } from "@src/store/route/routeTypes";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const ExistingSights = () => {
  const allSights: Sight[] = useSelector((state: any) => state.route.allSights);
  return (
    <Box style={{ width: "100%" }}>
      <h2>Какие достопримечательности есть?</h2>
      <Box>
        Для того, чтобы посмотреть, какие достопримечательности можно посмотреть, выгрузите данные.
        <Button>Просмотр</Button>
      </Box>
      <Box>
        {allSights.length
          ? allSights.map((sight) => (
              <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                {sight.title}
                {sight.lat}
                {sight.lon}
              </div>
            ))
          : "Список пуст"}
      </Box>
    </Box>
  );
};

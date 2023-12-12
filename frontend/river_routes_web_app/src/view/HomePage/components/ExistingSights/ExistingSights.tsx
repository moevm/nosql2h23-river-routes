import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Sight } from "@src/store/route/routeTypes";
import { getAllSights } from "@src/store/route/routeActions";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const ExistingSights = () => {
  const allSights: Sight[] = useSelector((state: any) => state.route.allSights);
  return (
    <Box style={{ padding: "1rem" }}>
      <h2>Какие достопримечательности есть?</h2>
      <Box display={"flex"} justifyContent={"space-between"}>
        Для того, чтобы посмотреть, какие достопримечательности можно посмотреть, выгрузите данные.
        <Button variant={"outlined"} onClick={getAllSights}>
          Просмотр
        </Button>
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

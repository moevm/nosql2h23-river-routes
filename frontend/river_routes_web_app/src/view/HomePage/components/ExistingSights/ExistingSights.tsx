import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { Sight } from "@src/store/route/routeTypes";
import { getAllSights } from "@src/store/route/routeActions";
import {Dispatch} from "redux";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const ExistingSights = () => {
  const allSights: Sight[] = useSelector((state: any) => state.route.allSights);
  const dispatch: Dispatch<any> = useDispatch();
  return (
    <Box style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2 style={{marginLeft: "5rem", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "50px", fontStyle: "normal", fontWeight: "700", lineHeight: "130%"}}>Какие достопримечательности есть?</h2>
      <div style={{display: "flex", flexDirection: "row", gap: "10rem", alignItems: "flex-end"}} >
          <text style={{marginLeft: "5rem", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "25px", fontStyle: "normal", fontWeight: "400", lineHeight: "130%", maxWidth: "784px"}}>
              Список достопримечательностей, которые можно посмотреть. Для того, чтобы посмотреть, какие достопримечательности можно посмотреть, выгрузите данные.</text>
        <Button variant={"outlined"} onClick={() => dispatch(getAllSights())}
            style={{width: "200px", height: "50px", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "20px", fontStyle: "normal", fontWeight: "400"}}>
          Просмотр
        </Button>
      </div>
      <Box>
        {allSights.length
          ? allSights.map((sight) => (
              <div style={{ width: "100%", display: "flex", flexDirection: "row", gap: "1rem", marginLeft: "5rem"}}>
                  <text>{sight.title}</text>
                  <text>({sight.lat}, {sight.lon})</text>
                  <text>добавлено 13.12.2023</text>
              </div>
            ))
            : <text style={{marginLeft: "5rem",}}>Пока что ничего нет :(</text>}
      </Box>
    </Box>
  );
};

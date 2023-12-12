import React, { useState } from "react";
import { Page } from "@src/components/Page/Page";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import ListContext from "@material-ui/core/List/ListContext";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
}));
export const CreateRoute = () => {
  const classes = useStyles();

  const sights = [];
  const [selectedSights, setSelectedSights] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const allSights: any = [];
  const allPierses: any = [];

  const handleToggle = (value: number) => () => {
    const currentIndex = selectedSights.indexOf(value);
    const newChecked = [...selectedSights];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedSights(newChecked);
  };

  return (
    <Page
      title={"Создать маршрут"}
      description={"Создайте свой собственный маршрут и наслаждайтесь прогулкой по воде!"}
    >
      <Container maxWidth={"lg"} className={classes.mainContainer}>
        <Box>
          <h2>Построить водный маршрут</h2>
          <p>
            Для того, чтобы построить свой маршрут, вам необходимо указать начальную и конечную точки маршрута, а также
            выбрать из предложенного списка, какие достопримечательности вы бы хотели увидеть с воды.
          </p>
        </Box>
        <Box>
          <h3>1. Выберите, какие достопримечательности вы бы хотели увидеть с воды </h3>
          <Box display={"flex"} flexDirection={"row"} width={"100%"}>
            <List
              style={{
                height: "500px",
                width: "min(40%, 300px)",
                display: "flex",
                justifyContent: "center",
                border: "1px solid black",
                padding: "0 10px 0 10px",
              }}
            >
              {allSights.length ? (
                allSights.map((elem: any, key: number) => (
                  <ListItem key={key}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedSights.indexOf(elem) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={elem.name} />
                  </ListItem>
                ))
              ) : (
                <p>Отсуствуют данные(</p>
              )}
            </List>
            <ul>
              {selectedSights.length ? (
                selectedSights.map((elem, key) => (
                  <li key={key}>
                    <p>{elem.address}</p>
                  </li>
                ))
              ) : (
                <p>Вы не выбрали ни одной достопримечательности</p>
              )}
            </ul>
            {/*<ul>*/}
            {/*  {selectedSights.length ? (*/}
            {/*  ) : (<p>Вы не выбрали ни одной достопримечательности</p>)}*/}
            {/*</ul>*/}
          </Box>
        </Box>
        <Box>
          <h3>2. Выберите начальную и конечную точки маршрута на карте</h3>
          <p>Начальная точка: </p>
          <p>Конечная точка: </p>
        </Box>
        <Box>
          <Button variant={"outlined"}>Построить маршрут</Button>
        </Box>
      </Container>
    </Page>
  );
};

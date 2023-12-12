import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@src/utils/useDebounce";
import PopularRoute from "./components/PopularRoute";
import { Box, Button, makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
export const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",

    width: "100%",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    listStyle: "none",
    overflowX: "auto",
    paddingBottom: "2rem",
  },
  element: {
    marginRight: "100px",
  },
}));

export const PopularRoutesSpin = () => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);
  const classes = useStyles();
  const checkForScrollPosition = () => {
    const { current } = listRef;
    console.log(current);
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };

  const debounceCheckForScrollPosition = useDebounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance: number) => listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", checkForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", checkForScrollPosition);
    };
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <div className={classes.container}>
        <ul ref={listRef} className={classes.list}>
          <li className={classes.element}>
            <PopularRoute
              image={null}
              title={"Ещё какое-то название"}
              description={
                "Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."
              }
              control_points_num={10}
              spent_time={"2ч"}
              length={"15км"}
            />
          </li>
          <li className={classes.element}>
            <PopularRoute
              image={null}
              title={"Ещё какое-то название"}
              description={
                "Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."
              }
              control_points_num={10}
              spent_time={"2ч"}
              length={"15км"}
            />
          </li>
          <li className={classes.element}>
            <PopularRoute
              image={null}
              title={"Ещё какое-то название"}
              description={
                "Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."
              }
              control_points_num={10}
              spent_time={"2ч"}
              length={"15км"}
            />
          </li>
          <li className={classes.element}>
            <PopularRoute
              image={null}
              title={"Ещё какое-то название"}
              description={
                "Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."
              }
              control_points_num={10}
              spent_time={"2ч"}
              length={"15км"}
            />
          </li>
        </ul>
      </div>
      {canScrollRight || canScrollLeft ? (
        <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
          <Button disabled={!canScrollLeft} onClick={() => scrollContainerBy(-400)}>
            <ArrowBackIcon />
          </Button>
          <Button disabled={!canScrollRight} onClick={() => scrollContainerBy(400)}>
            <ArrowForwardIcon />
          </Button>
        </div>
      ) : null}
    </Box>
  );
};

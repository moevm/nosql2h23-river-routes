import React, {useEffect, useRef, useState} from "react";
import {useDebounce} from "@src/utils/useDebounce";
import PopularRoute from "./components/PopularRoute";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  }
}));

export const PopularRoutesSpin = () => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);
  const classes = useStyles();
  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };

  const debounceCheckForScrollPosition = useDebounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance: number) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  return <div className={classes.container}>
    <ul ref={listRef}>
      <li>
        <PopularRoute image={null}
          title={"Ещё какое-то название"}
          description={"Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."}
          control_points_num={10}
          spent_time={"2ч"}
          length={"15км"}/>
      </li>
      <li>
        <PopularRoute image={null}
          title={"Ещё какое-то название"}
          description={"Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."}
          control_points_num={10}
          spent_time={"2ч"}
          length={"15км"}/>
      </li>
      <li>
        <PopularRoute image={null}
          title={"Ещё какое-то название"}
          description={"Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."}
          control_points_num={10}
          spent_time={"2ч"}
          length={"15км"}/>
      </li>
      <li>
        <PopularRoute image={null}
          title={"Ещё какое-то название"}
          description={"Главный водный путь, проходящий через какой-то там мост мимо афигеть какой интересной  достопримечательности."}
          control_points_num={10}
          spent_time={"2ч"}
          length={"15км"}/>
      </li>
    </ul>
  </div>;
};

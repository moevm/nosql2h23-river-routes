import React from "react";
import { Pierse, Sight } from "@src/store/route/routeTypes";
import { Entity } from "resium";
import { Cartesian3, Color } from "cesium";

export const MapPoint: React.FC<{
  data: Pierse | Sight;
  onClickHandler: () => any;
  isSelected: boolean;
  isSight: boolean;
}> = ({ data, onClickHandler, isSelected = false, isSight = false }) => {
  return (
    <Entity
      name={isSight ? `Достопримечательность ${data?.id}` : `Пирс ${data?.id}`}
      position={Cartesian3.fromDegrees(data.lon, data.lat, 10)}
      point={{
        pixelSize: isSelected ? 20 : 10,
        color: isSelected ? Color.AQUA : !isSight ? Color.BLUEVIOLET : Color.GREENYELLOW,
      }}
      onClick={onClickHandler}
    />
  );
};

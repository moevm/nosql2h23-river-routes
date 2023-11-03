import React from "react";
import {Box, makeStyles} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";


const useStyles = makeStyles((theme)=>({
  root: {

  },
  title: {

  },
  description: {

  },
  iconContainer: {

  },
  icon: {

  },
  iconText: {

  }
}));



export const PopularRoute:React.FC<{image: any, title: string, description: string, control_points_num: number, spent_time: string, length: string}> = ({image, title, description, control_points_num, spent_time, length}) => {
  const classes = useStyles();
  return <Box className={classes.root}>
    <div style={{backgroundColor: "grey", width: "362px", height: "450px"}}>

    </div>
    <p className={classes.title}>
      {title}
    </p>
    <span className={classes.description}>
      {description}
    </span>
    <Box className={classes.iconContainer}>
      <div>
        <LocationOnOutlinedIcon className={classes.icon}/>
        {control_points_num}
      </div>
      <div>
        <QueryBuilderOutlinedIcon className={classes.icon}/>
        {spent_time}
      </div>
      <div>
        <MapOutlinedIcon className={classes.icon}/>
        {length}
      </div>
    </Box>
  </Box>;
};

export default PopularRoute;

import React, {useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createTheme,
  makeStyles,
  styled,
  withTheme
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export const ExpandIcon:React.FC<{isExpand:boolean}> = (props) => {
  return <>{props.isExpand ? <RemoveIcon /> : <AddIcon />}
  </>;
};

export const CustomAccordionSummary= styled(AccordionSummary)({
  "& .MuiAccordionSummary-expandIconWrapper": {
    transition: "none!important",
    "&.Mui-expanded": {
      transform: "none!important",
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  summary: {
    // "& .MuiAccordionSummary-expandIconWrapper": {
    //   transition: "none!important",
    "& .Mui-expanded": {
      transform: "none",
    },
    // },
  },
  accordion: {
    borderTop: "1px solid #6E6E6E",
    borderRadius: 0,
    boxShadow: "none",
  },
}));


export const FaqAccordion:React.FC<{summary: string, details: string, style:any}> = (props: {summary: string, details: string, style:any}) => {
  const {summary, details, ...rest} = props;
  const classes = useStyles();
  const [isExpand, setIsExpand] = useState(false);
  return <Accordion className={classes.accordion} style={props.style}>
    <AccordionSummary
      classes={{root: classes.summary}}
      expandIcon={
        <ExpandIcon isExpand={isExpand}/>}
      onClick={()=>setIsExpand((prevState)=>!prevState)}>
      {summary}
    </AccordionSummary>
    <AccordionDetails>
      {details}
    </AccordionDetails>
  </Accordion>;
};

import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

interface PriceTagProps {
  price: number;
}

const PriceTag: React.FC<PriceTagProps> = ({ price }) => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      <span className={classes.price}>
        <Typography variant="h4">${price}</Typography>
      </span>
    </span>
  );
};

export default PriceTag;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#008000",
    textShadow: "0 -1px 1px black",
    padding: "6px 6px 6px 17px",
    display: "inline-block",
    borderRadius: 6,
    boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.55)",
    position: "relative"
    // "&:before": {
    //   content: "''",
    //   display: "block",
    //   position: "absolute",
    //   height: 13,
    //   width: 13,
    //   background: theme.palette.background.dark,
    //   borderRadius: 12,
    //   boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.75)",
    //   left: -5,
    //   top: 13,
    //   zIndex: 22
    // },
    // "&:after": {
    //   content: "''",
    //   display: "block",
    //   position: "absolute",
    //   zIndex: 10,
    //   height: 29,
    //   width: 29,
    //   borderRadius: 6,
    //   backgroundColor: "#008000",
    //   webKitTransform: "rotate(45deg)",
    //   transform: "rotate(45deg)",
    //   top: 5,
    //   left: -11,
    //   boxShadow: "0px 3px 2px -2px rgba(0,0,0,0.75)"
    // }
  },
  price: {
    position: "relative",
    zIndex: 100
  }
}));

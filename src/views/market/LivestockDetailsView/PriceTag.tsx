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
        <Typography variant="h4">{price}</Typography>
      </span>
    </span>
  );
};

export default PriceTag;

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#008000",
    textShadow: "0 -1px 1px black",
    padding: "6px 6px 6px 17px",
    display: "inline-block",
    borderRadius: 6,
    boxShadow: "1px 1px 1px 0px rgba(0,0,0,0.55)",
    position: "relative"
  },
  price: {
    position: "relative",
    zIndex: 100
  }
}));

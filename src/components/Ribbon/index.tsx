import React from "react";
import classes from "*.module.css";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

interface Props {
  status: string;
}

const Index: React.FC<Props> = ({ status }) => {
  const classes = useStyle();
  return (
    <div className={clsx(classes.root, classes[status])}>
      <small>
        <Typography variant="caption">{status}</Typography>
      </small>
    </div>
  );
};

export default Index;

const useStyle = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: 120,
    height: 120,
    zIndex: 8,
    top: 0,
    right: 0,
    color: "white",
    "& > small": {
      position: "absolute",
      display: "block",
      width: "100%",
      padding: 1,
      textAlign: "center",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "14",
      transform: "rotate(45deg)",
      boxShadow: theme.shadows[2],
      top: 16,
      left: 27
    }
  },
  sold: {
    "& > small": { background: theme.palette.error.main }
  },
  new: {
    "& > small": { background: theme.palette.success.main }
  }
}));

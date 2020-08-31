import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import "./loader.css";
import clsx from "clsx";
import MonkFish from "assets/icons/MonkFish";

interface LoaderProps {
  size: number;
}

const Index: React.FC<LoaderProps> = (props: LoaderProps) => {
  const classes = useStyles(props);

  return (
    <span data-text="Monkfish..." className={clsx("loader", classes.root)}>
      Monkfish...
    </span>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: (props: LoaderProps) => {
      return props.size;
    }
  }
}));

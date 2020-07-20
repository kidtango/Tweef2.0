import React, { useState, useRef } from "react";

import {
  Box,
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from "@material-ui/core";
import Results from "components/MarketResults/Results";
import { FilterObj } from "context/FilterOptionContext";

interface ResultsProps {
  filterObj?: FilterObj;
  [x: string]: any;
}

const ResultsViewA: React.FC<ResultsProps> = ({ filterObj, ...rest }) => {
  return <Results filterObj={filterObj} {...rest} />;
};

export default ResultsViewA;

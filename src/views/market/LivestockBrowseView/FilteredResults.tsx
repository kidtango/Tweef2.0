import React, { useState, useRef } from "react";
import _ from "lodash";

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
import { ToggleButtonGroup, ToggleButton, Pagination } from "@material-ui/lab";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Livestock } from "models/Livestock";
import LivestockCard from "components/LivestockCard";

interface ResultsProps {
  data: { livestock: Livestock[] }[];
  [x: string]: any;
}

const FilteredResults: React.FC<ResultsProps> = ({ data, ...rest }) => {
  const classes = useStyles();
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most popular");
  const [mode, setMode] = useState("grid");

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event: any, value: string) => {
    setMode(value);
  };

  return (
    <div className={classes.root} {...rest}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
      >
        <Typography className={classes.title} variant="h5" color="textPrimary">
          {/* Showing {data && data[0].livestock && data[0].livestock.length} items */}
        </Typography>
        <Box display="flex" alignItems="center">
          <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button>
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      {/* Livestock cards */}
      <Grid container spacing={3} className={classes.livestockCards}>
        {data.map((group) => (
          <>
            {group.livestock.map((item) => (
              <>
                <Grid
                  item
                  key={item.id}
                  md={mode === "grid" ? 4 : 12}
                  sm={mode === "grid" ? 6 : 12}
                  xs={12}
                >
                  <LivestockCard livestock={item} />
                </Grid>
              </>
            ))}
          </>
        ))}
      </Grid>

      <Menu
        anchorEl={sortRef.current}
        onClose={handleSortClose}
        open={openSort}
        elevation={1}
      >
        {["Most recent", "Popular", "Price high", "Price low", "On sale"].map(
          (option) => (
            <MenuItem key={option} onClick={() => handleSortSelect(option)}>
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    position: "relative",
    "&:after": {
      position: "absolute",
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  sortButton: {
    textTransform: "none",
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  livestockCards: {
    marginTop: theme.spacing(1)
  }
}));

export default FilteredResults;

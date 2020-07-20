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
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LivestockCard from "components/LivestockCard";
import useLivestockInfiniteQuery from "operations/queries/livestock/useLivestockInfiniteQuery";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { FilterObj } from "context/FilterOptionContext";

interface ResultsProps {
  filterObj: FilterObj;
  [x: string]: any;
}

const Results: React.FC<ResultsProps> = ({ filterObj, ...rest }) => {
  const classes = useStyles();
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Most popular");
  const [mode, setMode] = useState("grid");
  const loadMoreButtonRef: any = React.useRef();

  const {
    status,
    data,
    error,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useLivestockInfiniteQuery(filterObj);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore
  });

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

  const handleFetchMore = () => {
    fetchMore();
  };

  if (status === "loading") {
    return <Box mt={6}>Loading...</Box>;
  }

  if (error) {
    console.log(error);
    return <div>opps... Something went wrong, please refresh browser</div>;
  }

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
            {group.livestock.map((item: any) => (
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
      <Box mt={6} display="flex" justifyContent="center">
        <Button
          ref={loadMoreButtonRef}
          onClick={handleFetchMore}
          disabled={!canFetchMore || isFetchingMore}
          variant="text"
        >
          {isFetchingMore && "loading..."}
        </Button>
      </Box>
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

export default Results;

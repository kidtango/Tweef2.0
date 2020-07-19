import React, { useEffect } from "react";
import Header from "./Header";
import { makeStyles, Container, Box, Button } from "@material-ui/core";
import Page from "components/Page";

import Results from "./Results";
import Filter from "./Filter";

import useLivestockInfiniteQuery from "operations/queries/livestock/useLivestockInfiniteQuery";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useFilterOptionContext } from "context/FilterOptionContext";

const LivestockBrowse: React.FC = () => {
  const classes = useStyles();

  const { filterObj, isFiltered } = useFilterOptionContext();
  console.log("LivestockBrowse:React.FC -> isFiltered", isFiltered);

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          {isFiltered ? "Filtered Res" : <Results filterObj={filterObj} />}
        </Box>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100vh",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export default LivestockBrowse;

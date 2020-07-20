import React from "react";
import Header from "./Header";
import { makeStyles, Container, Box } from "@material-ui/core";
import Page from "components/Page";

import Results from "./Results";
import Filter from "./Filter";

import { useFilterOptionContext } from "context/FilterOptionContext";
import FilteredResults from "./FilteredResults";

const LivestockBrowse: React.FC = () => {
  const classes = useStyles();

  const { filterObj, isFiltered } = useFilterOptionContext();
  console.log("LivestockBrowse:React.FC -> filterObj", filterObj);

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          {isFiltered ? (
            <FilteredResults filterObj={filterObj} />
          ) : (
            <Results filterObj={filterObj!} />
          )}
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

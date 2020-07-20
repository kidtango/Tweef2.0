import React from "react";
import Header from "./Header";
import { makeStyles, Container, Box } from "@material-ui/core";
import Page from "components/Page";

import ResultsViewA from "./ResultsViewA";
import ResultsViewB from "./ResultsViewB";
import Filter from "./Filter";

import { useFilterOptionContext } from "context/FilterOptionContext";

const LivestockBrowse: React.FC = () => {
  const classes = useStyles();

  const { filterObj, isFiltered } = useFilterOptionContext();

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          {isFiltered ? (
            <ResultsViewB filterObj={filterObj} />
          ) : (
            <ResultsViewA filterObj={filterObj} />
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

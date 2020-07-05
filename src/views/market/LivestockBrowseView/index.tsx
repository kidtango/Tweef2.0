import React from 'react';
import Header from './Header';
import { makeStyles, Container, Box } from '@material-ui/core';
import Page from 'components/Page';

import Results from './Results';
import Filter from './Filter';

import useLivestocks from 'operations/queries/livestock/useLiveStocks';

const LivestockBrowseView: React.FC = () => {
  const classes = useStyles();

  const { status, data, error, isFetching } = useLivestocks();

  if (error) {
    console.log(error);
    return <div>opps... Something went wrong, please refresh browser</div>;
  }

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        {isFetching ? (
          <Box mt={6}>loading...</Box>
        ) : (
          <Box mt={6}>
            <Results livestock={data.allLivestock} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100vh',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export default LivestockBrowseView;

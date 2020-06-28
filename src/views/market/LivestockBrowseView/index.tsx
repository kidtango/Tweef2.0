import React from 'react';
import Header from './Header';
import { makeStyles, Container, Box } from '@material-ui/core';
import useIsMountedRef from 'hooks/useIsMountedRef';
import Page from 'components/Page';

import Results from './Results';
import { Livestock } from 'models/Livestock';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Filter from './Filter';

import useLivestocks from 'operations/queries/livestock/useLiveStocks';

const LivestockBrowseView: React.FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  const { status, data, error, isFetching } = useLivestocks();

  if (isFetching) return <div>loading...</div>;

  if (error)
    return <div>opps... Something went wrong, please refresh browser</div>;

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Results livestock={data.livestock} />
        </Box>
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

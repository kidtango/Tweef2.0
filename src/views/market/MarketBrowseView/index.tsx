import React from 'react';
import Header from './Header';
import { makeStyles, Container, Box } from '@material-ui/core';
import useIsMountedRef from 'hooks/useIsMountedRef';
import Page from 'components/Page';
import { Filter } from 'react-feather';
import Results from './Results';

interface Props {}

const MarketBrowseView: React.FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

export default MarketBrowseView;

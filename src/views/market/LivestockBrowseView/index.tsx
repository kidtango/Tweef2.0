import React from 'react';
import Header from './Header';
import { makeStyles, Container, Box } from '@material-ui/core';
import Page from 'components/Page';

import Results from './Results';
import Filter from './Filter';
import { Livestock } from 'models/Livestock';

import useLivestockInfiniteQuery from 'operations/queries/livestock/useLivestockInfiniteQuery';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

interface QueryResult {
  status: string;
  data: Livestock[];
  error: any;
  isFetching: any;
  isFetchingMore: any;
  fetchMore: any;
  canFetchMore: any;
}

const LivestockBrowseView: React.FC = () => {
  const classes = useStyles();
  const loadMoreButtonRef: any = React.useRef();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useLivestockInfiniteQuery();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore
  });

  if (error) {
    console.log(error);
    return <div>opps... Something went wrong, please refresh browser</div>;
  }

  const handleFetchMore = () => {
    fetchMore();
  };

  return (
    <Page title="Market" className={classes.root}>
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>

        {status === 'loading' ? (
          <Box mt={6}>loading...</Box>
        ) : (
          <Box mt={6}>{<Results data={data} />}</Box>
        )}
        <button
          ref={loadMoreButtonRef}
          onClick={handleFetchMore}
          disabled={!canFetchMore || isFetchingMore}
        >
          fetchmore
        </button>
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

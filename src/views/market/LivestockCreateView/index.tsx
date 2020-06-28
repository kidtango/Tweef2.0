import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import Page from 'components/Page';
import Header from './Header';
import ProductCreateForm from './ProductCreateForm';

const LivestockCreateView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Livestock Create">
      <Container maxWidth="lg">
        <Header />
        <ProductCreateForm />
      </Container>
    </Page>
  );
};

export default LivestockCreateView;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

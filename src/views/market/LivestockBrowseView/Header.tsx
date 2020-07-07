import React, { useState } from 'react';
import {
  Grid,
  makeStyles,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  SvgIcon
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import { PlusCircle as PlusIcon } from 'react-feather';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      container
      justify="space-between"
      spacing={3}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Market
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Browse
          </Link>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          See all current livestock for sale
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          component={RouterLink}
          to="/app/market/listItem"
          variant="contained"
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <PlusIcon />
          </SvgIcon>
          Add new livestock
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default Header;

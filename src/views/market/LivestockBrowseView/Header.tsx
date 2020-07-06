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
import { Livestock } from 'models/Livestock';
import useAddLivestock from 'operations/mutations/livestock/useAddLivestock';

import { MutationOptions } from 'react-query';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [livestock, setLivestock] = useState<any>();

  const [addLivestockMutation] = useAddLivestock(livestock!);

  const addLivestock = () => {
    const newLivestock: any = {
      name: 'RRC Orange Passion',
      price: 120.0,
      water: 'Saltwater',
      class: 'Coral',
      coralType: 'SPS',
      description: 'Buy now',
      location: 77040,
      sellerId: 'd9ca54d7-5010-4fac-a204-03914ffeb6ea',
      images: [
        'https://topshelfaquatics.com/wp-content/uploads/2020/06/SB.D7.062520-1.jpg'
      ]
    };

    setLivestock(newLivestock);

    addLivestockMutation(livestock!);
  };

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
          // component={RouterLink}
          // to="/app/livestock/create"
          variant="contained"
          onClick={addLivestock}
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

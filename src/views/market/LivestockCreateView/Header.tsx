import React from 'react';
import { Grid, Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

interface HeaderProps {
  className?: string;
  [x: string]: any;
}

const Header: React.FC<HeaderProps> = ({ className, ...rest }) => {
  return (
    <Grid
      className={className}
      container
      justify="space-between"
      spacing={3}
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
            <Typography variant="body1" color="textPrimary">
              Livestock
            </Typography>
          </Link>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          List livestock for sale
        </Typography>
      </Grid>
      <Grid item>
        <Button component={RouterLink} to="/app/market">
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;

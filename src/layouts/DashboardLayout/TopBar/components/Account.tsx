import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  ButtonBase,
  Button,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import history from 'utils/history';
import { useSnackbar } from 'notistack';

const Account = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getIdTokenClaims
  } = useAuth0();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const initAuth0 = async () => {
      if (isAuthenticated) {
        const { __raw } = await getIdTokenClaims();
        localStorage.setItem('idToken', __raw);
      }
    };
    initAuth0();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loginWithRedirect) {
      return loginWithRedirect();
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    try {
      handleClose();
      logout();
      history.push('/');
    } catch (error) {
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            component={ButtonBase}
            onClick={handleOpen}
          >
            <Avatar
              alt="User"
              className={classes.avatar}
              src={user.picture}
              ref={ref}
            ></Avatar>
            <Hidden smDown>
              <Typography
                variant="h6"
                color="inherit"
              >{`${user.given_name} ${user.family_name}`}</Typography>
            </Hidden>
          </Box>
          <Menu
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted
            PaperProps={{ className: classes.popover }}
            getContentAnchorEl={null}
            anchorEl={ref.current}
            open={isOpen}
          >
            <MenuItem component={RouterLink} to="/app/social/profile">
              Profile
            </MenuItem>
            <MenuItem>Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <div>
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

export default Account;

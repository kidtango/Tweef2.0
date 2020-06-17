import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';

// mock data
const user = {
  firstName: 'Scott',
  lastName: 'Tang',
  bio: 'Software Engineer',
  avatar:
    'https://insidethemagic-119e2.kxcdn.com/wp-content/uploads/2017/11/4Avatar-2-5.jpg'
};

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
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
          src={user.avatar}
          ref={ref}
        ></Avatar>
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >{`${user.firstName} ${user.lastName}`}</Typography>
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
        <MenuItem>Logout</MenuItem>
      </Menu>
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

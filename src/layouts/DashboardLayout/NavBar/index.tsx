import React, { useEffect } from 'react';
import {
  Chip,
  List,
  Box,
  Avatar,
  Hidden,
  Link,
  Typography,
  Divider,
  ListSubheader,
  Drawer
} from '@material-ui/core';
import {
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Share as ShareIcon,
  Mail as MailIcon
} from 'react-feather';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import PerfectScrollbar from 'react-perfect-scrollbar';
import RenderNavItems from './components/RenderNavItems';

const navConfig = [
  {
    subheader: 'My Aquariums',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/myaquarium/dashboard'
      }
    ]
  },
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Market',
        href: '/app/market',
        icon: ShoppingCartIcon,
        items: [
          {
            title: 'Browse Market',
            href: '/app/market'
          },
          {
            title: 'List Item On Market',
            href: '/app/market/ListItem'
          },
          {
            title: 'My Listings',
            href: '/app/market/MyListings'
          }
        ]
      },
      {
        title: 'Social Platform',
        href: '/app/social',
        icon: ShareIcon,
        items: [
          { title: 'Profile', href: '/app/social/profile' },
          {
            title: 'Salty',
            href: '/app/social/feed/salty'
          },
          { title: 'Fresh', href: '/app/social/feed/fresh' }
        ]
      },
      {
        title: 'Mail',
        href: '/app/mail',
        icon: MailIcon,
        info: () => <Chip color="secondary" size="small" label="Updated" />
      }
    ]
  }
];

interface NavBarProps {
  openMobile: any;
  onMobileClose: any;
}

const NavBar: React.FC<NavBarProps> = ({ openMobile, onMobileClose }) => {
  const classes = useStyles();
  const location = useLocation();

  // mock data
  const user = {
    firstName: 'Scott',
    lastName: 'Tang',
    bio: 'Software Engineer',
    avatar:
      'https://insidethemagic-119e2.kxcdn.com/wp-content/uploads/2017/11/4Avatar-2-5.jpg'
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">Logo</RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account" />
            <Avatar alt="User" className={classes.avatar} src={user.avatar} />
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >{`${user.firstName} ${user.lastName}`}</Link>
            <Typography variant="body2" color="textSecondary">
              {user.bio}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config: any) => (
            <List
              key={config.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {config.subheader}
                </ListSubheader>
              }
            >
              {RenderNavItems({
                items: config.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

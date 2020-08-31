import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import { THEMES } from "constants/themeConstants";
import { ITheme } from "theme";
import Logo from "assets/icons/Logo";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Contacts from "./components/Contacts";
import Notifications from "./components/Notifications";
import Search from "../NavBar/components/Search";

import { useAuth0 } from "@auth0/auth0-react";

interface TopBarProps {
  className?: string;
  onMobileNavOpen?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  [x: string]: any;
}

const TopBar: React.FC<TopBarProps> = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth0();

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        <Search />
        <Contacts />
        <Notifications />
        <Settings />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT
      ? { boxShadow: "none", backgroundColor: theme.palette.primary.main }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? { backgroundColor: theme.palette.background.default }
      : {})
  },
  toolbar: {
    minHeight: 64
  }
}));

export default TopBar;

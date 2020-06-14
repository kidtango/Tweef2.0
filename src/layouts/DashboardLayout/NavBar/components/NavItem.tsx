import React, { useState, ReactChild, Component, ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import { Theme, ListItem, Button, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';

export interface NavItemProps {
  title?: string;
  href?: string;
  depth: number;
  children?: ReactChild;
  icon?: typeof Component;
  className?: string;
  isOpen?: boolean;
  info?: typeof Component;
  [x: string]: any;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  href,
  depth,
  children,
  icon: Icon,
  className,
  isOpen,
  info: Info,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button className={classes.button} onClick={handleToggle} style={style}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? (
            <ExpandLessIcon fontSize="small" color="inherit" />
          ) : (
            <ExpandMoreIcon fontSize="small" color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        to={href!}
        exact
        style={style}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
        {Info && <Info className={classes.info} />}
      </Button>
    </ListItem>
  );
};

export default NavItem;

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      }
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.secondary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.secondary.main
    }
  },
  info: {}
}));

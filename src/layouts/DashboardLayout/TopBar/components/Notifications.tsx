import React, { useRef, useState, useEffect, Component } from 'react';
import { Link as RouterLink, Router } from 'react-router-dom';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Bell as BellIcon,
  Package as PackageIcon,
  MessageCircle as MessageIcon,
  Truck as TruckIcon
} from 'react-feather';
import { Notification } from 'models';

const iconsMap: { [key: string]: React.FC<any> } = {
  order_placed: PackageIcon,
  new_message: MessageIcon,
  item_shipped: TruckIcon
};

// mock data
const notifications: Notification[] = [
  {
    id: '5e8883f1b51cc1956a5a1ec0',
    title: 'Your order is placed',
    description: 'Dummy text',
    type: 'order_placed',
    createdAt: moment().subtract(2, 'hours').toDate().getTime()
  },
  {
    id: '5e8883f7ed1486d665d8be1e',
    title: 'New message received',
    description: 'You have 32 unread messages',
    type: 'new_message',
    createdAt: moment().subtract(1, 'day').toDate().getTime()
  },
  {
    id: '5e8883fca0e8612044248ecf',
    title: 'Your item is shipped',
    description: 'Dummy text',
    type: 'item_shipped',
    createdAt: moment().subtract(3, 'days').toDate().getTime()
  },
  {
    id: '5e88840187f6b09b431bae68',
    title: 'New message received',
    description: 'You have 32 unread messages',
    type: 'new_message',
    createdAt: moment().subtract(7, 'days').toDate().getTime()
  }
];

const Notifications: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <SvgIcon>
            <BellIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography variant="h5" color="textPrimary">
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box p={2}>
            <Typography variant="h6" color="textPrimary">
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <>
            <List disablePadding>
              {notifications.map((notification) => {
                const Icon = iconsMap[notification.type];

                return (
                  <ListItem
                    component={RouterLink}
                    divider
                    key={notification.id}
                    to="#"
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.icon}>
                        <SvgIcon fontSize="small">
                          <Icon />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={notification.title}
                      primaryTypographyProps={{
                        variant: 'subtitle2',
                        color: 'textPrimary'
                      }}
                      secondary={notification.description}
                    />
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </Popover>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  popover: { width: 320 },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

export default Notifications;

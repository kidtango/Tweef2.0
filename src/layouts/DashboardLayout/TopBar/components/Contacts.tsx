import React, { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { Users as UsersIcon } from 'react-feather';
import {
  Avatar,
  Box,
  IconButton,
  Link,
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
import { Contact } from 'models';
import objFromArray from 'utils/objFromArray';
import OnlineIndicator from 'components/OnlineIndicator';

// Mock data
const contacts: Contact[] = [
  {
    id: 'udie12x',
    name: 'Scott Tang',
    avatar:
      'https://media1.popsugar-assets.com/files/thumbor/iTdmM9a0ODRH1YGkQgcq7bfgZF4/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/01/11/875/n/1922153/a6e2ef55_edit_img_cover_file_39751492_1452532302_grid-cell-30798-1452255774-1/i/Photos-People-Freckles.jpg',
    isActive: true,
    lastActivity: moment().toDate().getTime()
  }
];

//TODO: delete this after API is implemented - START
let modContacts: {
  byId?: { [key: string]: any };
  allIds?: string[];
} = { byId: objFromArray(contacts), allIds: [''] };
modContacts.allIds = Object.keys(modContacts.byId!);
//TODO: delete this after API is implemented - END

const Contacts = () => {
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
      <Tooltip title="Contacts">
        <IconButton color="inherit" onClick={handleOpen} ref={ref}>
          <SvgIcon fontSize="small">
            <UsersIcon />
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
        <Typography variant="h4" color="textPrimary">
          Contacts
        </Typography>
        <Box mt={2}>
          <List disablePadding>
            {modContacts.allIds?.map((contactId) => {
              const contact = modContacts.byId![contactId];

              return (
                <ListItem disableGutters key={contact.id}>
                  <ListItemAvatar>
                    <Avatar alt="Person" src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.listItemText}
                    disableTypography
                    primary={
                      <Link
                        color="textPrimary"
                        component={RouterLink}
                        display="block"
                        underline="none"
                        noWrap
                        to="#"
                        variant="h6"
                      >
                        {contact.name}
                      </Link>
                    }
                  />
                  {contact.isActive ? (
                    <OnlineIndicator size="small" status="online" />
                  ) : (
                    <Typography color="textSecondary" noWrap variant="caption">
                      {moment(contact.lastActivity).fromNow()}
                    </Typography>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default Contacts;

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320,
    padding: theme.spacing(2)
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: { whiteSpace: 'nowrap' }
}));

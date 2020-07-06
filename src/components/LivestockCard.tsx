import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Users as UsersIcon } from 'react-feather';
import moment from 'moment';

import { Livestock } from 'models/Livestock';
import getInitials from 'utils/getInitials';

interface LivestockCardProps {
  livestock: Livestock;
  className?: string;
  [x: string]: any;
}

const LivestockCard: React.FC<LivestockCardProps> = ({
  livestock,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState(livestock.isLiked || false);
  const [likes, setLikes] = useState(livestock.likes || 0);

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={3}>
        <CardMedia className={classes.media} image={livestock.images[0]} />
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar alt="seller" src={livestock.member.avatar}>
            {getInitials(
              livestock.member.firstName + ' ' + livestock.member.lastName
            )}
          </Avatar>
          <Box ml={2}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to="#"
              variant="h5"
            >
              {livestock.name}
            </Link>
            <Typography variant="body2" color="textSecondary">
              Seller:{' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="#"
                variant="h6"
              >
                {livestock.member.firstName +
                  ' ' +
                  livestock.member.lastName[0]}
              </Link>{' '}
              | Updated {moment(livestock.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box pb={2} px={3}>
        <Typography color="textSecondary" variant="h3">
          {livestock.price}
        </Typography>
      </Box>
      <Box pb={2} px={3}>
        <Typography color="textSecondary" variant="body2">
          {livestock.description}
        </Typography>
      </Box>
      <Box py={2} px={3}>
        <Grid alignItems="center" container justify="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
              {livestock.location}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Location
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" color="textPrimary">
              {livestock.coralType}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Livestock Type
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box py={2} pl={2} pr={3} display="flex" alignItems="center">
        {isLiked ? (
          <Tooltip title="Unlike">
            <IconButton className={classes.likedButton} onClick={handleUnlike}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography variant="subtitle2" color="textSecondary">
          {likes}
        </Typography>
        <SvgIcon
          fontSize="small"
          color="action"
          className={classes.subscribersIcon}
        >
          <UsersIcon />
        </SvgIcon>
        {/* <Typography variant="subtitle2" color="textSecondary">
          {livestock.subcribers && livestock.subcribers.length}
        </Typography> */}
        <Box flexGrow={1} />
        <Rating value={livestock.member.rating} size="small" readOnly />
      </Box>
    </Card>
  );
};

export default LivestockCard;

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));

import React, { useState, useEffect } from 'react';
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
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useAuth0 } from '@auth0/auth0-react';

import moment from 'moment';
import parse from 'html-react-parser';

import { Livestock, CreateLike } from 'models/Livestock';
import useInsertLike from 'operations/mutations/like/useAddLike';
import useDeleteLike, {
  LikeDelete
} from 'operations/mutations/like/useDeleteLike';

import { useSnackbar } from 'notistack';

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
  const [isLiked, setLiked] = useState(false);
  const [likes, setLikes] = useState(livestock.likes?.length || 0);
  const { user, isAuthenticated } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  const [inserLike] = useInsertLike({
    onMutate: () => {
      setLiked(true);
      setLikes((prevLikes) => prevLikes + 1);
    },
    onError: () => {
      setLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
      enqueueSnackbar('Opps...Something went wrong, please try again later', {
        variant: 'error'
      });
    }
  });

  const [deleteLike] = useDeleteLike({
    // On success, decreminting like counter
    onMutate: () => {
      setLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
    },
    // On failure, switch back to original like counter state by incrementing like counter
    onError: () => {
      setLiked(true);
      setLikes((prevLikes) => prevLikes + 1);
      enqueueSnackbar('Opps...Something went wrong, please try again later', {
        variant: 'error'
      });
    }
  });

  useEffect(() => {
    if (livestock && livestock.likes && livestock.likes.length > 0) {
      livestock.likes.map((like) => {
        if (like.user.auth0_id === user.sub) {
          setLiked(true);
        }
      });
    }
  }, []);

  const handleLike = (livestock_id: string) => {
    if (!isAuthenticated)
      return enqueueSnackbar('Please login first before liking an item', {
        variant: 'error'
      });

    const newLike: CreateLike = {
      livestock_id
    };
    inserLike(newLike);
  };

  const handleUnlike = () => {
    if (!isAuthenticated)
      return enqueueSnackbar('Please login first before liking an item', {
        variant: 'error'
      });

    const targetLike: LikeDelete = {
      user_id: user.sub
    };
    deleteLike(targetLike);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={3}>
        <CardMedia className={classes.media} image={livestock.images[0]} />
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar alt="seller" src={livestock.user && livestock.user.picture} />
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
                {livestock.user && livestock.user.nick_name}
              </Link>{' '}
              | Created {moment(livestock.createdAt).fromNow()}
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
          {parse(livestock.description)}
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
              {livestock.coral_type}
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
            <IconButton onClick={() => handleLike(livestock.id!)}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography variant="subtitle2" color="textSecondary">
          {likes}
        </Typography>

        <Box flexGrow={1} />
        <Typography variant="subtitle2" color="textSecondary">
          Seller Rating:
        </Typography>
        <Rating
          value={livestock.user && livestock.user.rating}
          size="small"
          readOnly
        />
      </Box>
    </Card>
  );
};

export default LivestockCard;

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    minHeight: 400,
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

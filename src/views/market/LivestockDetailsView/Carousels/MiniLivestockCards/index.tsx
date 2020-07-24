import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles,
  CardActionArea,
  Chip
} from "@material-ui/core";

interface Props {}

const MiniLivestockCards = (props: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={1}>
      <CardActionArea>
        <Box>
          <CardMedia
            className={classes.media}
            image={
              "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
            }
          />
          <Box ml={1} p={1}>
            <Link
              color="textSecondary"
              component={RouterLink}
              to="#"
              variant="h4"
            >
              Confetti
            </Link>
          </Box>
        </Box>
        <Box pb={2} px={3}>
          <Chip
            label="$199.99"
            size="small"
            variant="default"
            color="primary"
            className={classes.chip}
          />
        </Box>
        <Divider />
        <Box py={1} px={1}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h5" color="textSecondary">
                77878
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color="textSecondary">
                SPS
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default MiniLivestockCards;

const useStyles = makeStyles((theme) => ({
  root: {
    transition: "all .2s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[8],
      transform: "translateY(-15px)"
    }
  },
  media: {
    minHeight: 250
  },

  chip: {
    borderRadius: 4,
    backgroundColor: "green"
  }
}));

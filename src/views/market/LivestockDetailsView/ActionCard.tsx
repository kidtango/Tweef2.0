import React from "react";
import {
  makeStyles,
  createStyles,
  Box,
  Card,
  Avatar,
  Typography,
  Theme,
  Badge,
  Button
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
interface Props {}

const ActionCard = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={10}>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box mr={1}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              variant="dot"
            >
              <SmallAvatar
                alt="seller"
                sizes="small"
                src={
                  "https://s3.amazonaws.com/liberty-uploads/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg"
                }
              />
            </StyledBadge>
          </Box>
          <Box>
            <Box>
              <Typography variant="body2" color="textPrimary">
                Chris V
              </Typography>
            </Box>
            <Box display="flex">
              <Rating value={5} size="small" readOnly />{" "}
              <Typography variant="body2" color="textPrimary">
                (54)
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth>
            Make offer
          </Button>
        </Box>
        <Box mt={1}>
          <Button variant="outlined" color="primary" fullWidth>
            Ask Seller
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ActionCard;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 44,
      height: 44,
      border: `2px solid ${theme.palette.background.paper}`
    }
  })
)(Avatar);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""'
      }
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0
      }
    }
  })
)(Badge);

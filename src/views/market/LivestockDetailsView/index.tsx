import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { queryCache } from "react-query";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  makeStyles,
  Container,
  Box,
  Link,
  Paper,
  Typography,
  Divider
} from "@material-ui/core";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import Page from "components/Page";
import ActionCard from "./ActionCard";
import CardMedia from "@material-ui/core/CardMedia";
import FlowIcon from "./svg/FlowIcon";
import SunIcon from "./svg/SunIcon";
import PriceTag from "./PriceTag";
import RelatedItemsCarousels from "./Carousels/RelatedItemsCarousels/RelatedItemsCarousels";
import LivestockGallery from "./Carousels/LivestockGallery";
import Header from "./Header";

interface MatchParams {
  livestockId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const Index: React.FC<MatchProps> = ({ match, location }) => {
  const classes = useStyles();

  const [handleOpen, setHandleOpen] = useState({ open: false });

  const handleClick = () => {
    setHandleOpen({ open: true });
  };

  const matches = useMediaQuery("(max-width:600px)");

  const livestockId = match.params.livestockId;
  //Retrieve livestock from React-Query's cache
  // const livestockItems: any = queryCache.getQueryData(["livestock"]);
  // let livestock: Livestock | undefined;

  // if (!livestockItems) return <div>No data in cache</div>;

  // // Loop through cache and return the selected livestock item
  // livestockItems.map((livestockGroup: { livestock: Livestock[] }) => {
  //   // exit loop if livestock is already found
  //   if (livestock) return true;

  //   livestockGroup.livestock.map((el) => {
  //     if (livestock) return true;

  //     if (el.id === livestockId) {
  //       livestock = el;
  //     }
  //   });
  // });

  // if (!livestock) return <div>No livestock found</div>;

  return (
    <Page title="Livestock Detail" className={classes.root}>
      <Container maxWidth="lg">
        <Box mb={4}>
          <Header />
        </Box>

        <Box display="flex" alignItems="left" flexWrap="wrap">
          <Box mr={2} className={classes.gallery} mb={2}>
            <LivestockGallery />
          </Box>

          <Box flexWrap="wrap" flex={1}>
            <Paper className={classes.description} elevation={0}>
              <Box mb={2}>
                <Typography variant="h4" color="textPrimary">
                  RR Aussie Gold – WYSIWYG SPS Frag
                </Typography>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    <Link href="#">Cedar Park, TX</Link>
                    <PersonPinCircleIcon
                      fontSize="small"
                      color="primary"
                    />{" "}
                    Local pickup (22 miles away)
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box p={1}>
                <PriceTag price={99.99} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  WYSIWYG – you will receive the exact piece shown.
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Photos are taken under Radion G4 Pros, 100% Violet, 100% UV,
                  100% Deep Blue, 50% Blue.
                </Typography>
              </Box>
              <Box mt={2} display="flex" alignItems="center">
                <Box mr={1}>
                  <FlowIcon />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  <strong>Flow:</strong> High
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={2}>
                <Box mr={1}>
                  <SunIcon />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  <strong>Light Intensity:</strong> High
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
        {/* Related items and more items sold by sellers */}
        <Box display="flex" flexWrap="wrap" alignContent="right">
          <Box flexGrow={1} />
          <Box mt={!matches && -16} mr={!matches && 6}>
            <ActionCard />
          </Box>
        </Box>
        <Box mt={1}>
          <RelatedItemsCarousels />
        </Box>
        <Box mt={2}>
          <RelatedItemsCarousels />
        </Box>
      </Container>
    </Page>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100vh",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  media: {
    minHeight: 500,
    minWidth: 400,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 4,
    marginBottom: 4
  },
  description: {
    padding: theme.spacing(2),
    minHeight: 500,
    minWidth: 350
  },
  gallery: {
    maxWidth: 400
  }
}));

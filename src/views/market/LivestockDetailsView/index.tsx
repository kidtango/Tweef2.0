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
  Divider,
  Card,
  CardContent
} from "@material-ui/core";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import Page from "components/Page";
import ActionCard from "./ActionCard";
import ImageCarousel from "./ImageCarousel";
import CardMedia from "@material-ui/core/CardMedia";
import FlowIcon from "./svg/FlowIcon";
import SunIcon from "./svg/SunIcon";
import PriceTag from "./PriceTag";
import RelatedItemsCarousels from "./Carousels/RelatedItemsCarousels";
import TestimonialSlider from "./Carousels/TestimonialSlider.tsx";

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
        {/* <div>Header Section</div> */}

        <Box display="flex" alignItems="left" flexWrap="wrap">
          <Box mr={2}>
            <Link onClick={handleClick} href="#">
              <CardMedia
                component="div"
                className={classes.media}
                image={
                  "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
                }
              />
            </Link>
          </Box>

          <Box mr={2} flexWrap="wrap" flex={1}>
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
              <Box>
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
        <Box mt={2}>
          <RelatedItemsCarousels />
        </Box>
        <Box mt={2}>
          <RelatedItemsCarousels />
        </Box>

        <ImageCarousel
          handleOpen={handleOpen}
          setHandleOpen={setHandleOpen}
          isMobile={matches}
        />
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
    minHeight: 350,
    minWidth: 300,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 4
  },
  imageContainer: {},
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  description: {
    padding: theme.spacing(2),
    minHeight: 350,
    minWidth: 300
  }
}));

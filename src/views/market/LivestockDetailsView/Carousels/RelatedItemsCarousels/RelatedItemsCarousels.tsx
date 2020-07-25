import React from "react";
import { CardContent, Card, makeStyles, Box } from "@material-ui/core";
import Slider from "react-slick";
import "./reactSlick.css";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MiniLivestockCards from "../MiniLivestockCards";

interface Props {}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <ArrowBackIosIcon fontSize="large" />
      </div>
    </>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <ArrowForwardIosIcon fontSize="large" />
      </div>
    </>
  );
}

const RelatedItemsCarousels = (props: Props) => {
  const classes = useStyles();

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 940,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };
  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Slider {...settings}>
          <Box>
            <CardContent>
              <Box p={1}>
                <Box className={classes.sliderItem}>
                  <MiniLivestockCards />
                </Box>
              </Box>
            </CardContent>
          </Box>
          <Box>
            <CardContent>
              <Box p={1}>
                <div className={classes.sliderItem}>
                  <MiniLivestockCards />
                </div>
              </Box>
            </CardContent>
          </Box>
          <div>
            <CardContent>
              <Box p={1}>
                <div className={classes.sliderItem}>
                  <MiniLivestockCards />
                </div>
              </Box>
            </CardContent>
          </div>
          <div>
            <CardContent>
              <Box p={1}>
                <div className={classes.sliderItem}>
                  <MiniLivestockCards />
                </div>
              </Box>
            </CardContent>
          </div>
          <div>
            <CardContent>
              <Box p={1}>
                <div className={classes.sliderItem}>
                  <MiniLivestockCards />
                </div>
              </Box>
            </CardContent>
          </div>
        </Slider>
      </CardContent>
    </Card>
  );
};

export default RelatedItemsCarousels;

const useStyles = makeStyles((theme) => ({
  root: {
    borderWidth: 3,
    overflow: "visible !important"
  },
  sliderItem: {
    borderRadius: 5,
    fontSize: 36,
    padding: 0,
    position: "relative",
    textAlign: "center",
    transition: "all .2s ease-in-out"
  },
  media: {
    minHeight: 220,
    minWidth: 200,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 4
  }
}));

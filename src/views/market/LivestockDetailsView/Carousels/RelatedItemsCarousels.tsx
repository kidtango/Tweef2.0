import React from "react";
import {
  CardContent,
  Card,
  makeStyles,
  Box,
  CardMedia
} from "@material-ui/core";
import Slider from "react-slick";
import "./dist/reactSlick.css";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    <Card className={classes.root}>
      <CardContent>
        <Slider {...settings}>
          <Box>
            <CardContent>
              <Box p={3}>
                <Box className={classes.sliderItem}>
                  {/* <CardMedia
                    className={classes.media}
                    image={
                      "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
                    }
                  /> */}
                </Box>
              </Box>
            </CardContent>
          </Box>
          <Box>
            <CardContent>
              <Box p={3}>
                <div className={classes.sliderItem}>
                  {/* <CardMedia
                    className={classes.media}
                    image={
                      "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
                    }
                  /> */}
                </div>
              </Box>
            </CardContent>
          </Box>
          <div>
            <CardContent>
              <Box p={3}>
                <div className={classes.sliderItem}>
                  {/* <CardMedia
                    className={classes.media}
                    image={
                      "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
                    }
                  /> */}
                </div>
              </Box>
            </CardContent>
          </div>
          <div>
            <CardContent>
              <Box p={3}>
                <div className={classes.sliderItem}>
                  {/* <CardMedia
                    className={classes.media}
                    image={
                      "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
                    }
                  /> */}
                </div>
              </Box>
            </CardContent>
          </div>
          <div>
            <CardContent>
              <Box p={3}>
                <div className={classes.sliderItem}>
                  {/* <CardMedia
                    className={classes.media}
                    image={
                      "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
                    }
                  /> */}
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
    borderWidth: 1,
    overflow: "visible !important"
  },
  sliderItem: {
    background: theme.palette.background.dark,
    borderRadius: 5,
    color: "gray",
    fontSize: 36,
    padding: 0,
    position: "relative",
    height: 300,
    lineHeight: 300,
    textAlign: "center",
    transition: "all .2s ease-in-out"
  },
  media: {
    minHeight: 350,
    minWidth: 300,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 4
  }
}));

import React from "react";
import Slider from "react-slick";
import { CardMedia, Card, makeStyles, Box } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface Props {}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <ArrowBackIosIcon fontSize="large" htmlColor="white" />
      </div>
    </>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <ArrowForwardIosIcon fontSize="large" htmlColor="white" />
      </div>
    </>
  );
}

const Index = () => {
  const classes = useStyles();

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <div>
      <Slider {...settings} slidesToShow={1} slidesToScroll={1} dots={true}>
        <Box>
          <CardMedia
            component="div"
            className={classes.media}
            image={
              "https://res.cloudinary.com/scotttang/image/upload/v1595003166/tank%20images/z51fhkhurosvwmc57sq8.jpg"
            }
          />
        </Box>
        <Box>
          <CardMedia
            component="div"
            className={classes.media}
            image={
              "https://res.cloudinary.com/scotttang/image/upload/v1594958289/tank%20images/id2m82ntlx77glb012qh.jpg"
            }
          />
        </Box>
        <Box>
          <CardMedia
            component="div"
            className={classes.media}
            image={
              "https://res.cloudinary.com/scotttang/image/upload/v1594931690/tank%20images/wtaz8iwrk7xmj1p0zcnt.jpg"
            }
          />
        </Box>
      </Slider>
    </div>
  );
};

export default Index;

const useStyles = makeStyles((theme) => ({
  media: {
    minHeight: 500,
    minwidth: 320,
    borderRadius: 4,
    marginBottom: 4
  }
}));

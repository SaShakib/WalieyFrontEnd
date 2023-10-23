import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { generatePublicUrl } from "../../../urlConfig";

const useStyle = makeStyles((theme) => ({
  item: {
    height: "auto",
    width: "100%",
    maxHeight: "520px",
    display: "flex !important",
    justifyContent: "center",
  },
  image: {
    height: "auto",
    maxHeight: "520px",
    maxWidth: "1200px",
    width: "100%",
    borderRadius: 8,
  },
  slider: {
    marginBottom: "20px",
    marginTop: "20px",
  },
}));
const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  lazyLoad: "progressive",
  draggable: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: true,
  pauseOnHover: true,
};

function SliderIndex() {
  const classes = useStyle();
  const sliderItem = useSelector((state) => state.superAdmin.sliders);

  return (
    <div>
      {sliderItem && sliderItem.length ? (
        <Slider className={classes.slider} {...settings}>
          {sliderItem.map((item, key) => (
            <div className={classes.item} key={key}>
              <img
                className={classes.image}
                src={generatePublicUrl(item.slider)}
                alt=""
              />
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
}

export default SliderIndex;

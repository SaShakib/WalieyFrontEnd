import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import img from "./test.webp";
import { Link } from "react-router-dom";

const style = {
  category: {
    position: "absolute",
    top: 4,
    left: 12,

    fontFamily: "sans",
    fontSize: "20px",
    fontWeight: 600,
    fontStyle: "italic",
    zIndex: 4,
  },
  products: {
    position: "absolute",
    bottom: 8,
    right: 12,

    textAlign: "center",
    fontFamily: "sans",
    fontWeight: 600,
    fontStyle: "italic",
    zIndex: 3,
    // // backgroundColor: "#fff",
    // borderRadius: 15,
  },
  paper: {
    width: 250,
    height: 200,
    margin: 12,
    borderRadius: `0 32px 0 32px`,
    boxShadow: `0px 0px 20px #00000026`,
    position: "relative",
  },
  media: {
    height: 200,
    width: 250,
    backgroundSize: `100% 100%`
  },
  overlay: {
    position: "absolute",
    background: "rgb(255 255 255 / 30%)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    width: "100%",
    height: "100%",
  },
};
function AllCategory(props) {
  return (
    <div>
      <Card style={style.paper}>
        <CardActionArea
          color="#fff"
          component={Link}
          to={`/Category/child/${props.slug}`}
        >
          <div style={style.overlay}></div>
          <CardMedia
            title="D"
            image={props.categoryImage ? props.categoryImage : img}
            style={style.media}
          />
          <CardContent>
            <Typography align="left" variant="subtitle1" style={style.category}>
              {props.name}
            </Typography>
            <Typography
              align="right"
              variant="subtitle2"
              style={style.products}
            >
              See Products
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default AllCategory;

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import img from "./test.jpg";

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
    borderRadius: `0 32px 0 32px`,
    boxShadow: `0px 0px 20px #00000015`,
    position: "relative",
  },
  media: {
    height: 200,
    width: 250,
  },
};
function AllCategory() {
  return (
    <div>
      <Card style={style.paper}>
        <CardActionArea color="#fff">
          <CardMedia title="D" image={img} style={style.media} />
          <CardContent>
            <Typography align="left" variant="subtitle1" style={style.category}>
              Samsung
            </Typography>
            <Typography
              align="right"
              variant="subtitle2"
              style={style.products}
            >
              50 Products
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default AllCategory;

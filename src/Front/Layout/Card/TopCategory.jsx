import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import img from "./test.jpg";

const style = {
  category: {
    position: "absolute",
    bottom: -26,
    left: 50,
    right: 12,
    fontFamily: "sans",
    fontWeight: 700,
    fontSize: 16,
    fontStyle: "italic",
    zIndex: 4,
  },

  paper: {
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: `50% 50% 15px 50%`,
    boxShadow: `0px 0px 20px #00000015`,
  },
  media: {
    height: 172,
    width: 200,
  },
};
function TopCategory(props) {
  return (
    <Card style={style.paper}>
      <CardActionArea color="#fff" component={Link} to={`Category/${props.id}`}>
        <CardMedia
          title="D"
          image={props.img ? props.img : img}
          style={style.media}
        />
        <CardContent>
          <Typography align="right" variant="caption" style={style.category}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TopCategory;

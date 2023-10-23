import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import img from "./test.jpg";
import { Link } from "react-router-dom";

function ShopsCard(props) {
  const style = {
    products: {
      position: "absolute",
      top: 8,
      left: 12,

      textAlign: "center",
      fontFamily: "sans",
      fontWeight: 600,
      fontStyle: "italic",
      zIndex: 3,
      // // backgroundColor: "#fff",
      // borderRadius: 15,
    },
    shop: {
      position: "absolute",
      bottom: 4,
      right: 12,

      zIndex: 4,
      fontFamily: "sans",
      fontSize: "20px",
      fontWeight: 600,
      fontStyle: "italic",
    },
    paper: {
      width: 250,
      height: 200,
      margin: 10,
      borderRadius: `32px 32px 0 32px`,
      boxShadow: `0px 0px 6px #00000015`,
    },
    media: {
      height: 200,
      position: "relative",
      width: 250,
    },
  };
  return (
    <div>
      <Card style={style.paper}>
        <CardActionArea color="#fff" component={Link} to={`shops/${props._id}`}>
          <CardMedia
            title="D"
            image={props.profilePic ? props.profilePic : img}
            style={style.media}
          />
          <CardContent>
            {props.location && props.location.place ? (
              <Typography
                align="right"
                variant="subtitle2"
                style={style.products}
              >
                {props.location.place}
              </Typography>
            ) : null}

            <Typography variant="subtitle1" align="right" style={style.shop}>
              {props.shopname}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default ShopsCard;

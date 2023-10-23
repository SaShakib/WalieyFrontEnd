import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import img from "./no.jpg";
import { Link } from "react-router-dom";

const style = {
  category: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,

    textAlign: "center",
    fontFamily: "sans",
    fontSize: "20px",
    fontWeight: 600,
    fontStyle: "italic",
    zIndex: 4,
  },
  products: {
    position: "absolute",
    bottom: 6,
    right: 12,

    zIndex: 4,
  },
  paper: {
    width: 250,
    height: 200,
    margin: 12,
    borderRadius: `0 32px 0 32px`,
    boxShadow: `0px 0px 20px #00000015`,
  },
  media: {
    height: 200,
    width: 250,
  },
  font: {
    fontFamily: "sans",
    fontWeight: 600,
    fontStyle: "italic",
  },

};
function LocationCard(props) {
 
  return (
    <div>
      <Card style={style.paper}>
        <CardActionArea color="#fff" component={Link} to={`/ShopsByLocation/${props.place}`}>
          <CardMedia title="D" image={img} style={style.media} />
          <CardContent>
            <Typography variant="subtitle1" style={style.category}>
              {props.place}
            </Typography>
            <div style={style.products}>
              <Typography variant="subtitle2" align="right" style={style.font}>
                {props.zilla}
              </Typography>
              <Typography variant="subtitle2" align="right" style={style.font}>
                See Shops
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default LocationCard;

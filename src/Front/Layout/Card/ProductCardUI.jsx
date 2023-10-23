import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import img from "./test.jpg";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  card: {
    minWidth: 308,
    margin: 6,
    borderRadius: `38px`,
    boxShadow: `0px 0px 20px #00000015`,
  },
  media: {
    minHeight: "182px",
    backgroundSize: "100%",
    height: "100%",
 
    minWidth: 120,
    borderRadius: `38px`,
  },
  padding: {
    paddingRight: 16,
    paddingTop: 12,
  },
  text: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    fontFamily: "sans",
    paddingTop: 4,
  
  },
}));

function ProductCardUI(props) {
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/Products/${props._id}`}>
        <Grid container>
          <Grid item xs={5}>
            <CardMedia
              className={classes.media}
              title="jjj"
              image={
                props.productPictures && props.productPictures.length
                  ? generatePublicUrl(props.productPictures[0].img)
                  : img
              }
            />
          </Grid>
          <Grid item xs={5} style={{ paddingLeft: 8, paddingTop: 12 }}>
            <div style={{ display: "flex", paddingRight: 4 }}>
              <StarIcon color="secondary" style={{fontSize: 20}}/>
              <StarIcon color="secondary" style={{fontSize: 20}}/>
              <StarIcon color="secondary" style={{fontSize: 20}}/>
              <StarIcon color="secondary" style={{fontSize: 20}}/>
              <StarBorderIcon color="secondary" style={{fontSize: 20}}/>
            </div>

            <Typography
              variant="h5"
              style={{ paddingTop: 4 }}
              className={classes.text}
              color="secondary"
            >
              {props.name}
            </Typography>

            {props.colors && props.colors.length ? (
              <div
                style={{ display: "flex", paddingTop: 4, alignItems: "center" }}
              >
                <Typography
                  variant="h6"
                  style={{ fontFamily: "sans", paddingRight: 4 }}
                  align="right"
                  color="secondary"
                >
                  Color:
                </Typography>
                {props.colors.map(({ hex }, key) => (
                  <div
                    key={key}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 4,
                      boxShadow: "0px 0px 35px #00000050",
                      borderRadius: `50%`,
                      background: hex,
                    }}
                  ></div>
                ))}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={2} className={classes.padding} align="right">
            <FavoriteBorderOutlinedIcon
              color="secondary"
              align="right"
              style={{ padding: 0, fontSize: 20 }}
            />

            {props.sale_price ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h5"
                  className={classes.text}
                  align="right"
                  color="secondary"
                >
                  <del style={{ textAlign: "right" }}>৳{props.price}</del>
                </Typography>

                <Typography
                  variant="h5"
                  className={classes.text}
                  align="right"
                  color="secondary"
                >
                  ৳{props.sale_price}
                </Typography>
              </div>
            ) : (
              <Typography
                variant="h5"
                className={classes.text}
                align="right"
                color="secondary"
              >
                ৳{props.price}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default ProductCardUI;

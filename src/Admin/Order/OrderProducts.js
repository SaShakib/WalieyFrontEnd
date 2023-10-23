import {
  Card,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import img from "./test.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 308,
    borderRadius: `24px`,
    marginTop: 12,
    boxShadow: `0px 0px 20px #00000026`,
  },
  name: {
    fontFamily: "sans",
    paddingTop: 4,
    fontStyle: "italic",
  },
  media: {
    height: "100%",
    minWidth: 120,
    borderRadius: `24px`,
  },
  circle: {
    width: 20,
    height: 20,
    boxShadow: "0px 0px 20px #00000026",
    borderRadius: `50%`,
  },

  details: {
    display: "flex",
    alignItems: "center",
  },
  Total: {
    paddingRight: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  font: {
    fontFamily: "sans",
    paddingRight: 4,
  },
  monospace: {
    fontFamily: "monospace",
    paddingRight: 4,
    fontSize: 16,
  },
}));

function OrderProducts(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={5}>
          <CardMedia
            className={classes.media}
            title="jjj"
            image={props.img ? props.img : img}
          />
        </Grid>
        <Grid item xs={4} style={{ paddingLeft: 16, paddingTop: 12 }}>
          <Typography variant="h5" className={classes.name} color="secondary">
            {props.name}
          </Typography>
          <Typography variant="h5" className={classes.name} color="secondary">
            ${props.price}
          </Typography>
          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              color: {props.color}
            </Typography>
          </div>
          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              size: {props.size}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.Total} align="right">
          <Typography variant="h3" align="right" color="primary">
            {props.quantity}
          </Typography>
          <Typography variant="h5" align="right" color="secondary">
            ${props.total}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default OrderProducts;

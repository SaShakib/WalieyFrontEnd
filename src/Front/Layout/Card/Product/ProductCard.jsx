import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "230px",
    minWidth: "200px",
    margin: "12px",
    padding: "10px",
    "&:hover": {},
  },
  media: {
    height: "150px",
  },
});

export default function ProductCard(props) {
  const classes = useStyles();


  return (
    <Card elevation={0} className={classes.root}>
      <CardActionArea
        style={{ justifyContent: "center" }}
        component={Link}
        to={`Products/${props._id}`}
      >
        {props.productPictures && props.productPictures.length ? (
          <CardMedia
            className={classes.media}
            image={props.productPictures[0].img}
            src=""
          />
        ) :  (
          <CardMedia className={classes.media} image="No Image" src="" />
        )}

        <CardContent>
          <Typography variant="h6" component="h3" align="center">
            {props.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            align="center"
            color="textSecondary"
          >
            {props.category.name}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            color="primary"
            component="p"
          >
            $ {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Button fullWidth variant="outlined" color="primary">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

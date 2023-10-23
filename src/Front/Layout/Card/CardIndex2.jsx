import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink,  } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "250px",
    minWidth: "200px",
    margin: "12px",
    padding: "10px",
    "&:hover": {},
  },
  media: {
    height: "150px",
  },
});

function CardIndex2(props) {
  const classes = useStyles();
  const cardItem = {};
  if (!props.img) {
    cardItem.img = "No Image";
  }


  return (
    <div>
      <Card elevation={0} className={classes.root}>
        <CardActionArea
          style={{ justifyContent: "center" }}
          component={RouterLink}
          to={`shops/${props._id}`}
        >
          <CardMedia className={classes.media} src="" image={cardItem.img} />
          <CardContent>
            <Typography variant="h6" component="h3" align="center">
              {props.shopname}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              align="center"
              color="textSecondary"
            >
              {props.location ? props.location.place : null}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default CardIndex2;

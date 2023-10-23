import {
  Card,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import React from "react";
import img from "./test.webp";
import DoneIcon from "@material-ui/icons/Done";

import DeleteIcon from "@material-ui/icons/Delete";
import { generatePublicUrl } from "../../../urlConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SuperAdminDeleteProduct,
  SuperAdminUpdateProduct,
} from "../../../features/SuperAdmin";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 308,
    margin: 8,
    borderRadius: `38px`,
    boxShadow: `0px 0px 20px #00000026`,
  },
  name: {
    fontFamily: "sans",
    paddingTop: 4,
    fontStyle: "italic",

    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  media: {
    height: "100%",                 
    minWidth: 120,
    
    borderRadius: `38px`,
  },
  circle: {
    width: 30,
    height: 30,
    boxShadow: "0px 0px 35px #00000050",
    borderRadius: `50%`,
  },

  details: {
    display: "flex",
    alignItems: "center",
  },
  Buttons: {
    paddingRight: 16,
    paddingTop: 12,
  },
  font: {
    fontFamily: "sans",
    paddingRight: 4,
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  monospace: {
    fontFamily: "monospace",
    paddingRight: 4,
    fontSize: 16,
  },
}));

function AdminProducts(props) {
  const classes = useStyles();
  const [best_seller, setBest_seller] = useState(false);
  const [featured, setFeatured] = useState(false);
  const dispatch = useDispatch();

  let stockCheck;
  if (props.product.stock === true) {
    stockCheck = true;
  } else {
    stockCheck = false;
  }

  useEffect(() => {
    if (props.product.best_seller === true) {
      setBest_seller(true);
    } else {
      setBest_seller(false);
    }

    if (props.product.featured === true) {
      setFeatured(true);
    } else {
      setFeatured(false);
    }
  }, [props.product.featured, props.product.best_seller]);

  const handleFeatured = () => {
    setFeatured(!featured);
  };

  const handleBestSeller = () => {
    setBest_seller(!best_seller);
  };

  const handleClick = (e) => {
    const form = { e, best_seller, featured };
    // console.log(form)
    dispatch(SuperAdminUpdateProduct(form));
  };

  const handleDelete = (e) => {
    dispatch(SuperAdminDeleteProduct(e));
  };

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={5}>
          <CardMedia
            className={classes.media}
            title="jjj"
            style={{backgroundSize: "100%"}}
            image={
              props.product.productPictures &&
              props.product.productPictures.length
                ? generatePublicUrl(props.product.productPictures[0].img)
                : img
            }
          />
        </Grid>
        <Grid item xs={5} style={{ paddingLeft: 16, paddingTop: 12 }}>
          <Typography variant="h5" className={classes.name} color="secondary">
            {props.product.name}
          </Typography>
          <Typography variant="h6" className={classes.name} color="secondary">
            ${props.product.price}{" "}
            <div>
              {props.product.createdBy !== null
                ? props.product.createdBy.shopname
                : null}
            </div>
          </Typography>

          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              Stock:
            </Typography>
            
            <Switch color="secondary" checked={stockCheck} name="Stock" />
          </div>
          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              BestSeller:
            </Typography>
            <Switch
              color="secondary"
              checked={best_seller}
              name="best_seller"
              onChange={handleBestSeller}
            />
          </div>
          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              Featured:
            </Typography>
            <Switch
              color="secondary"
              onChange={handleFeatured}
              checked={featured}
              name="featured"
            />
          </div>
        </Grid>
        <Grid item xs={2} className={classes.Buttons} align="right">
          <IconButton onClick={() => handleDelete(props.product._id)}>
            <DeleteIcon color="secondary" align="right" />
          </IconButton>
          <IconButton onClick={() => handleClick(props.product._id)}>
            <DoneIcon color="secondary" align="right" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AdminProducts;

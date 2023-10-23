import {
  Card,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import img from "./test.jpg";
import DoneIcon from "@material-ui/icons/Done";
import { useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { generatePublicUrl } from "../../../urlConfig";
import { useEffect } from "react";
import {
  getAdminProduct,
  UpdateAdminStock,
} from "../../../features/Products/products_index";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../features/Products/SingleProduct";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 308,
    margin: 5,
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
    backgroundSize: "100%",
    borderRadius: `38px`,
  },
  circle: {
    width: 20,
    height: 20,
    marginRight: 4,
    boxShadow: "0px 0px 35px #00000050",
    borderRadius: `50%`,
  },

  details: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
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
  const [stock, setStock] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.product.stock === true) {
      setStock(true);
    } else {
      setStock(false);
    }
  }, [props.product.stock]);

  const handleDone = (e) => {
    const form = { e, stock };
    dispatch(UpdateAdminStock(form));
  };
  const handleDelete = (e) => {
    dispatch(deleteProduct(e));
    dispatch(getAdminProduct());
    props.rerender(true);
  };
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={5}>
          <CardMedia
            className={classes.media}
            title="jjj"
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
            ${props.product.price}
          </Typography>

          {props.product.colors && props.product.colors.length ? (
            <div className={classes.details}>
              <Typography
                variant="h6"
                className={classes.font}
                align="right"
                color="secondary"
              >
                Color:
              </Typography>
              {props.product.colors.map(({ hex }, key) => (
                <div
                  key={key}
                  className={classes.circle}
                  style={{
                    backgroundColor: hex,
                  }}
                ></div>
              ))}
            </div>
          ) : null}

          {props.product.sizes && props.product.sizes.length ? (
            <div className={classes.details}>
              <Typography
                variant="h6"
                className={classes.font}
                align="right"
                color="secondary"
              >
                Sizes:
              </Typography>
              <div className={classes.monospace}>
                {props.product.sizes.map((size) => size.name)}
              </div>
            </div>
          ) : null}
          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              Category:
            </Typography>
            <div className={classes.monospace}>
              {props.product.category && props.product.category.length
                ? props.product.category.map((cat) => cat.name)
                : null}
            </div>
          </div>

          <div className={classes.details}>
            <Typography
              variant="h6"
              className={classes.font}
              align="right"
              color="secondary"
            >
              Stock:
            </Typography>
            <Switch
              color="secondary"
              onChange={() => setStock(!stock)}
              checked={stock}
              name="stock"
            />
          </div>
        </Grid>
        <Grid item xs={2} className={classes.Buttons} align="right">
          <IconButton
            component={Link}
            to={`/admin/UpdateProduct/${props.product._id}`}
          >
            <EditIcon color="secondary" align="right" />
          </IconButton>
          <IconButton onClick={() => handleDelete(props.product._id)}>
            <DeleteIcon color="secondary" align="right" />
          </IconButton>
          <IconButton onClick={() => handleDone(props.product._id)}>
            <DoneIcon color="secondary" align="right" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AdminProducts;

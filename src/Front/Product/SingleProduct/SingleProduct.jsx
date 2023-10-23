import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/Cart/CartRedux";
import { generatePublicUrl } from "../../../urlConfig";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const useStyle = makeStyles((theme) => ({
  Gcontainer: {
    flexGrow: 1,
    padding: 15,
  },
  Gitem1: {
    padding: 10,
    // textAlign: "right",
  },
  Gitem2: {
    padding: 10,
    textAlign: "left",
    fontFamily: "Poppins",
  },
  img: {
    height: "auto",
    borderRadius: 20,
    maxWidth: "100%",
    width: "100%",
    verticalAlign: "middle",
  },
  body1: {
    // fontSize: "2rem",
    fontStyle: "italic",
    fontFamily: "Poppins",
    lineHeight: 0.8,
  },
  brand: {
    maxWidth: "90px",
    height: "auto",
  },
  colorCircle: {
    width: 30,
    height: 30,
    boxShadow: "0px 0px 20px #00000026",
    borderRadius: "50%",
    marginLeft: 10,
  },
  flex: {
    display: "flex",
    marginBottom: 8,
    alignItems: "center",
  },
  subMedia: {
    height: "120px",
    width: "auto",
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 12,
  },
}));

function SingleProduct(props) {
  const classes = useStyle();
  const [disable, setDisable] = React.useState(false);
  const [Color, setColor] = React.useState("");
  const [Size, setSize] = React.useState("");
  const dispatch = useDispatch();
  const [image, setImage] = React.useState();
  const [images, setImages] = React.useState();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (props.productPictures && props.productPictures.length) {
      setImages(props.productPictures);
      setImage(props.productPictures[0]);
    }
  }, [props.productPictures]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const AddToCart = () => {
    dispatch(
      addToCart({
        id: props._id,
        name: props.name,
        owner: props.createdBy.shopname,
        price: props.sale_price ? props.sale_price : props.price,
        quantity: 1,
        Color: Color
          ? Color
          : props.colors && props.colors.length
          ? props.colors[0].name
          : "",
        Size: Size
          ? Size
          : props.sizes && props.sizes.length
          ? props.sizes[0].name
          : "",
        createdBy: props.createdBy ? props.createdBy : "",
        img: generatePublicUrl(props.productPictures[0].img),
      })
    );
    setOpen(true);
    setDisable(true);
  };
  return (
    <div>
      <Grid className={classes.Gcontainer} container justify="space-between">
        <Grid className={classes.Gitem1} item xs={12} sm={6}>
          {images && images.length ? (
            <div>
              <img
                className={classes.img}
                src={generatePublicUrl(image.img)}
                alt=""
              />

              <div style={{ paddingTop: 12 }}>
                {images.map((images, key) => (
                  <img
                    key={key}
                    src={generatePublicUrl(images.img)}
                    alt=""
                    className={classes.subMedia}
                    onClick={() => setImage(images)}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Grid>
        <Grid className={classes.Gitem2} item xs={12} sm={6}>
          <div
            style={{
              paddingBottom: 8,
              justifyContent: "space-between",
            }}
          >
            <Typography
              className={classes.body1}
              style={{ fontStyle: "initial", lineHeight: 1 }}
              variant="h3"
            >
              {props.name}
            </Typography>
            <br />
            <Typography
              className={classes.body1}
              style={{ fontStyle: "initial", lineHeight: 1 }}
              variant="h6"
              color="secondary"
            >
              Product owner:{" "}
              <Link
                style={{ textDecoration: "none", color: "#4fce2fcf" }}
                to={`/shops/${props.createdBy._id}`}
              >
                {props.createdBy.shopname}
              </Link>
            </Typography>
            {props.sale_price ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingTop: 16,
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  className={classes.body1}
                  variant="h4"
                  color="primary"
                  style={{ paddingRight: 8 }}
                >
                  <del>৳{props.price}</del>
                </Typography>

                <Typography
                  className={classes.body1}
                  variant="h4"
                  color="primary"
                  style={{ paddingLeft: 8 }}
                >
                  ৳{props.sale_price}
                </Typography>
              </div>
            ) : (
              <Typography
                className={classes.body1}
                variant="h4"
                color="primary"
                style={{ paddingLeft: 8, paddingTop: 12 }}
              >
                ৳{props.price}
              </Typography>
            )}
          </div>

          <Typography
            style={{
              // paddingTop: 10,
              paddingBottom: 8,
              fontFamily: "Poppins",
              fontStyle: "italic",
              fontSize: "1.5rem",
            }}
            variant="subtitle1"
            color="secondary"
          >
            {props.description}
          </Typography>

          {props.colors && props.colors.length ? (
            <div className={classes.flex} style={{ alignItems: "center" }}>
              <Typography variant="h5" style={{ fontFamily: "sans-sarif" }}>
                Colors:{" "}
              </Typography>
              {props.colors.map(({ hex }, key) => (
                <div
                  key={key}
                  style={{ backgroundColor: `${hex}` }}
                  className={classes.colorCircle}
                ></div>
              ))}
            </div>
          ) : null}

          {props.sizes && props.sizes.length ? (
            <div className={classes.flex}>
              <Typography variant="h5" style={{ fontFamily: "sans-sarif" }}>
                Sizes:
              </Typography>
              {props.sizes.map(({ name }, key) => (
                <div
                  key={key}
                  className={classes.flex}
                  style={{ marginBottom: 0 }}
                >
                  <p
                    style={{
                      marginLeft: 10,
                      alignItems: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {props.category && props.category.length ? (
            <div className={classes.flex}>
              <Typography
                variant="h5"
                style={{
                  fontFamily: "sans-sarif",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Categories:
              </Typography>
              {props.category.map(({ name }, key) => (
                <div
                  key={key}
                  className={classes.flex}
                  style={{ marginBottom: 0 }}
                >
                  <p
                    style={{
                      marginLeft: 10,
                      alignItems: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <Typography
            color="error"
            variant="body2"
            style={{ fontStyle: "italic", fontSize: "1rem" }}
          >
            Please Select Color and Size So We can provide you exact what you
            need
          </Typography>
          <br />
          <Snackbar
            open={open}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleClose}
          >
            <MuiAlert onClose={handleClose} severity="success">
              Added To The Cart SuccessFully!
            </MuiAlert>
          </Snackbar>
          {props.colors && props.colors.length ? (
            <div className={classes.flex} style={{ alignItems: "center" }}>
              <Typography>Select Colors: </Typography>
              <select
                name="color"
                aria-label="Select Color"
                style={{
                  padding: "8px 12px",
                  border: `1px solid grey`,
                  borderRadius: "15px",
                  marginLeft: 8,
                }}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Color</option>
                {props.colors.map(({ name }, key) => (
                  <option value={name} key={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {props.sizes && props.sizes.length ? (
            <div className={classes.flex} style={{ alignItems: "center" }}>
              <Typography>Select Size: </Typography>
              <select
                name="size"
                aria-label="Select Size"
                style={{
                  padding: "8px 12px",
                  border: `1px solid grey`,
                  borderRadius: "15px",
                  marginLeft: 8,
                }}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Size</option>
                {props.sizes.map(({ name }, key) => (
                  <option value={name} key={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <Button
            type="button"
            style={{ marginBottom: 10 }}
            fullWidth
            disabled={disable}
            variant="outlined"
            color="secondary"
            onClick={() => AddToCart()}
          >
            Add To Cart
          </Button>
        </Grid>
      </Grid>

      {props.LongDescription ? (
        <div>
          <Typography align="center" variant="h5">
            Long Description
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: props.LongDescription }} />
        </div>
      ) : null}
    </div>
  );
}

export default SingleProduct;

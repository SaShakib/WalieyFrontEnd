import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../features/Products/SingleProduct";
import { Switch } from "@material-ui/core";
import { Categories } from "../../features/Category/category_index";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getColor } from "../../features/Utils/index_color";
import { getSize } from "../../features/Utils/index_size";
import axiosIntance from "../../app/helpers/axios";
import { generatePublicUrl } from "../../urlConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ProductCreate() {
  //product requirement start
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sale_price, setSale_price] = useState("");
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState("");
  const [stock, setStock] = useState(true);
  const [sizes, setSizes] = useState("");
  const [best_seller, setBest_seller] = useState(false);
  const [featured, setFeatured] = useState(true);
  const [productPictures, setProductPictures] = useState("");
  const [uploading, setUploading] = useState("");

  const [change, setChange] = useState(true);
  //product requirement end

  const classes = useStyles();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.singleProduct);
  const CategoryState = useSelector((state) => state.categories);
  const ColorState = useSelector((state) => state.color);
  const SizeState = useSelector((state) => state.size);
  //get from database
  useEffect(() => {
    dispatch(Categories());
    dispatch(getColor());
    dispatch(getSize());

    return () => {};
  }, [dispatch]);

  //delete file

  //handle Files
  const handleFiles = (e) => {
    const file = e.target.files[0];

    const bodyFormData = new FormData();
    bodyFormData.append("ProductImage", file);
    axiosIntance
      .post("/products/upload", bodyFormData)
      .then((response) => {
        setProductPictures(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  //handlesubmit function

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      name,
      description,
      price,
      sale_price,
      category,
      stock,
      best_seller,
      featured,
    };
    if (colors !== "" && colors.length > 0) form.colors = colors;
    if (sizes !== "" && sizes.length > 0) form.sizes = sizes;
    if (productPictures !== "") form.productPictures = productPictures;

    dispatch(createProduct(form));
    setName("");
    setPrice("");
    setSale_price("");
    setChange(false);
    // setColors("");
    // setSizes("");
    // setCategory("");
    setProductPictures("");
  };

  const Colorsection = () => {
    if (ColorState.colors) {
      return (
        <Autocomplete
          id="color"
          multiple
          key={change}
          onChange={(value, newValue) => setColors(newValue.map((i) => i._id))}
          options={ColorState.colors}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Color"
              variant="outlined"
              placeholder="Color"
            />
          )}
        />
      );
    }
  };

  const CategorySection = () => {
    if (
      CategoryState.loading === false &&
      CategoryState.categories.length > 0
    ) {
      return (
        <Autocomplete
          id="category"
          multiple
          onChange={(value, newValue) =>
            setCategory(newValue.map((i) => i._id))
          }
          key={change}
          options={CategoryState.categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              placeholder="Category"
            />
          )}
        />
      );
    }
  };
  const SizeSection = () => {
    if (SizeState.loading === false && SizeState.sizes.length > 0) {
      return (
        <Autocomplete
          id="Size"
          multiple
          key={change}
          onChange={(value, newValue) => setSizes(newValue.map((i) => i._id))}
          options={SizeState.sizes}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sizes"
              variant="outlined"
              placeholder="Sizes"
            />
          )}
        />
      );
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Product
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Product Name"
                variant="outlined"
                required
                fullWidth
                id="Product Name"
                label="Product Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="Description"
                variant="outlined"
                required
                fullWidth
                id="Description"
                label="Description"
                autoFocus
                multiline
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                variant="outlined"
                required
                fullWidth
                id="price"
                label="price"
                autoFocus
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Sale Price"
                variant="outlined"
                fullWidth
                id="Sale Price"
                label="Sale Price"
                autoFocus
                value={sale_price}
                onChange={(e) => setSale_price(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {CategorySection()}
            </Grid>
            <Grid item xs={12}>
              {Colorsection()}
            </Grid>
            <Grid item xs={12}>
              {SizeSection()}
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="">
                Stock
                <Switch
                  checked={stock}
                  onChange={(value, newValue) => setStock(newValue)}
                />
              </div>
              <div className="">
                Best Seller
                <Switch
                  checked={best_seller}
                  onChange={(value, newValue) => setBest_seller(newValue)}
                />
              </div>
              <div className="">
                Featured
                <Switch
                  checked={featured}
                  onChange={(value, newValue) => setFeatured(newValue)}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} align="center">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                files={productPictures}
                onChange={handleFiles}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span">
                  Upload
                </Button>
              </label>
              {uploading === true ? (
                <div>Uploading...</div>
              ) : uploading === false && productPictures.length > 0 ? (
                <div>
                  <Button
                    type="button"
                    onClick={() => {
                      axiosIntance
                        .delete(`/products/upload/${productPictures[0].img}`)
                        .then((response) => console.log(response.data))
                        .catch((err) => console.log(err));
                      setProductPictures("");
                    }}
                  >
                    Delete
                  </Button>
                  <img
                    style={{ maxWidth: 150, maxHeight: 150 }}
                    src={generatePublicUrl(productPictures[0].img)}
                    alt="Nothing"
                  />
                </div>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onKeyPress={(e) => e.preventDefault()}
            color="primary"
            className={classes.submit}
          >
            Create location
          </Button>
        </form>
        {singleProduct.loading === false && singleProduct.message ? (
          <Typography color="primary">{singleProduct.message}</Typography>
        ) : null}
      </div>
    </Container>
  );
}

export default ProductCreate;

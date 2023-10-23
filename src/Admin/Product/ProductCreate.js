import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../../features/Category/category_index";
import { getColor } from "../../features/Utils/index_color";
import { getSize } from "../../features/Utils/index_size";
import axiosIntance from "../../app/helpers/axios";
import { generatePublicUrl } from "../../urlConfig";
import { useParams } from "react-router-dom";
import { UpdateAdminProduct } from "../../features/Products/SingleProduct";
import AdminHeader from "../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

  const [LongDescription, setLongDescription] = useState("");

  const [productPictures, setProductPictures] = useState("");
  const [uploading, setUploading] = useState("");

  //product requirement end
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.singleProduct);

  useEffect(() => {
    dispatch(Categories());
    dispatch(getColor());
    dispatch(getSize());
    axiosIntance.get(`/products/${id}`).then((res) => {
      const products = res.data.product;
      setName(products.name);
      setDescription(products.description);
      setPrice(products.price);
      setSale_price(products.sale_price);

      setProductPictures(products.productPictures);

      if (products.LongDescription) {
        setLongDescription(products.LongDescription);
      }
    });
  }, [dispatch, id]);

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
        console.log(uploading);
        setUploading(false);
      });
  };

  //handlesubmit function

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      id,
      name,
      description,
      price,
      sale_price,
      LongDescription,
    };

    if (productPictures !== "") form.productPictures = productPictures;

    dispatch(UpdateAdminProduct(form));
    setName("");
    setPrice("");
    setSale_price("");
    setDescription("");
    setLongDescription("");
    setProductPictures("");
  };

  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update Product
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
              <Grid item xs={12}>
                <CKEditor
                  editor={ClassicEditor}
                  data={LongDescription}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setLongDescription(data);
                  }}
                  onBlur={(event, editor) => {
                    // console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    // console.log("Focus.", editor);
                  }}
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
                {productPictures.length ? (
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
              color="secondary"
              className={classes.submit}
            >
              Update Product
            </Button>
          </form>
          {/* ) : null} */}

          {singleProduct.loading === false && singleProduct.message ? (
            <Typography color="primary">{singleProduct.message}</Typography>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default ProductCreate;

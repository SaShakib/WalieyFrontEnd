import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddProduct from "./addProduct";
import { Container } from "@material-ui/core";
import ProductStart from "./ProductStart";
import ProductDescription from "./ProductDescription";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../../../features/Category/category_index";
import { getColor } from "../../../features/Utils/index_color";
import { getSize } from "../../../features/Utils/index_size";
import { createProduct } from "../../../features/Products/SingleProduct";
import AdminHeader from "../../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../../BottomNavigation/BottomNavigation.index";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddProductStepper() {
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [price, setPrice] = useState("");
  const [sale_price, setSale_price] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState("");
  const [LongDescription, setLongDescription] = useState("");
  const singleProduct = useSelector((state) => state.singleProduct);
  const CategoryState = useSelector((state) => state.categories);
  const ColorState = useSelector((state) => state.color);
  const SizeState = useSelector((state) => state.size);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Categories());
    dispatch(getColor());
    dispatch(getSize());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      name,
      description,
      price,
      sale_price,
      LongDescription,
      category,
      stock: true,
    };
    if (colors !== "" && colors.length > 0) form.colors = colors;
    if (sizes !== "" && sizes.length > 0) form.sizes = sizes;
    if (productPictures !== "") form.productPictures = productPictures;

    dispatch(createProduct(form));
    setProductPictures("");
  };
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container
        component="main"
        maxWidth="md"
        style={{ paddingRight: 4, paddingLeft: 4, marginBottom: 90 }}
      >
        <div>
          <ProductStart
            name={setName}
            productPictures={setProductPictures}
            productPicture={productPictures}
          />
          <AddProduct
            category={setCategory}
            categoryOpt={CategoryState}
            colors={setColors}
            colorOpt={ColorState}
            sizes={setSizes}
            sizeOpt={SizeState}
            price={setPrice}
            sale_price={setSale_price}
          />
          <ProductDescription description={setDescription} />
          <Container maxWidth="md">
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
          </Container>
          <Container maxWidth="md" style={{ marginTop: 8 }}>
            <Button
              type="button"
              variant="outlined"
              style={{ paddingTop: 8 }}
              color="secondary"
              fullWidth
              onClick={handleSubmit}
              onKeyPress={(e) => e.preventDefault()}
            >
              Create Product
            </Button>
          </Container>
          {singleProduct.loading === false && singleProduct.message ? (
            <Typography
              align="center"
              style={{ paddingTop: 15 }}
              color="primary"
            >
              {singleProduct.message}
            </Typography>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

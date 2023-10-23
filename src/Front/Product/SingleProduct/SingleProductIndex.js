import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../features/Products/SingleProduct";
import ProductCardUI from "../../Layout/Card/ProductCardUI";
import SingleProduct from "./SingleProduct";

function SingleProductIndex() {
  const state = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div style={{ marginBottom: 90 }}>
      <Container maxWidth="lg" component="main">
        {state.loading === true ? (
          <div className="">loading</div>
        ) : (
          <div>
            {state.loading === false && state.product ? (
              <SingleProduct {...state.product} />
            ) : state.loading === false && state.error ? (
              <div>Something Went Wrong </div>
            ) : null}
          </div>
        )}

        <br />
        {state.similar ? (
          <div>
            <Typography
              variant="h5"
              gutterBottom
              display="block"
              style={{
                fontStyle: "italic",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
              align="center"
            >
              Similar PRODUCTS
            </Typography>
            <Typography
              variant="body2"
              style={{ fontStyle: "italic" }}
              gutterBottom
              display="block"
              align="center"
              color="secondary"
            >
              Here Are Some Similar Products <br />
              You may Love
            </Typography>

            <Grid
              container
              justify="center"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {state.loading === false && state.similar
                ? state.similar.map((product, key) => (
                    <Grid key={product._id} item xs={12} sm={6} md={4}>
                      <ProductCardUI {...product} />
                    </Grid>
                  ))
                : null}
            </Grid>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default SingleProductIndex;

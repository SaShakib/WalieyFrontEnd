import { Grid } from "@material-ui/core";
import React from "react";
import ProductCardUI from "../../../Layout/Card/ProductCardUI";

function BestSeller(props) {
  const { bestseller } = props;

  return (
    <Grid
      container
      justify="center"
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {bestseller && bestseller.length > 0 ? (
        bestseller.map((product, key) => (
          <Grid key={key} item xs={12} sm={6} md={4}>
            <ProductCardUI key={product._id} {...product} />
          </Grid>
        ))
      ) : (
        <div>No products Avaiable in Best Seller</div>
      )}
    </Grid>
  );
}

export default BestSeller;

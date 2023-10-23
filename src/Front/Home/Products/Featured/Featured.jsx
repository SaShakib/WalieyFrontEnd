import { Grid } from "@material-ui/core";
import React from "react";

import ProductCardUI from "../../../Layout/Card/ProductCardUI";

function Featured(props) {
  const { featured } = props;
  return (
    <Grid
      container
      justify="center"
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {featured && featured.length > 0 ? (
        featured.map((product, key) => (
          <Grid key={key} item xs={12} sm={6} md={4}>
            <ProductCardUI key={product._id} {...product} />
          </Grid>
        ))
      ) : (
        <div>No products Avaiable in Featured</div>
      )}
    </Grid> 
  );
}

export default Featured;

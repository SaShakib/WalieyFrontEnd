import { Grid, Typography } from "@material-ui/core";
import React from "react";

import ShopsCard from "../../Layout/Card/ShopsCard";

function ShopsIndex(props) {
  const { shops } = props;
  return (
    <div style={{marginBottom: 25}}>
      <Typography
        variant="h5"
        style={{
          fontStyle: "italic",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
        display="block"
        align="center"
        color="secondary"
      >
        SHOPS
      </Typography>
      <Typography
        variant="body2"
        style={{
          fontStyle: "italic",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
        gutterBottom
        display="block"
        align="center"
        color="secondary"
      >
        Connected Shops That brings You the most valuable Products
      </Typography>
      <Grid
        container
        justify="center"
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {shops && shops.length ? (
          shops.map((shop, key) => (
            <Grid key={key} item>
              <ShopsCard {...shop} />
            </Grid>
          ))
        ) : (
          <div>No Shops Avaible</div>
        )}
      </Grid>
    </div>
  );
}

export default ShopsIndex;

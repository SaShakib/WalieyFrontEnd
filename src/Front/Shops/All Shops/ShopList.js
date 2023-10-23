import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TopCategory } from "../../../features/Category/category_index";
import { getShops } from "../../../features/Shops/index_shops";
import Banner from "../../Layout/Banner/Banner";

import ShopsCard from "../../Layout/Card/ShopsCard";

function ShopList() {
  const state = useSelector((state) => state.shops);
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShops());
    dispatch(TopCategory());
  }, [dispatch]);
  return (
    <div style={{ marginBottom: 90 }}>
      {category.categories && category.categories.length ? (
        <Banner category={category.categories} name="SHOPS" />
      ) : null}

      {state.loading === true ? (
        <div className="sf">Loading</div>
      ) : state.loading === false && state.shops ? (
        <Grid
          container
          justify="center"
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {state.shops && state.shops.length
            ? state.shops.map((product, key) => (
                <Grid key={key} item>
                  <ShopsCard {...product} />
                </Grid>
              ))
            : null}
        </Grid>
      ) : null}
    </div>
  );
}

export default ShopList;

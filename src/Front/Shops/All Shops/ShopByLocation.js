import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByplace } from "../../../features/Utils/index_location";

import ShopsCard from "../../Layout/Card/ShopsCard";

function ShopByLocation() {
  const state = useSelector((state) => state.location);
  const dispatch = useDispatch();
  let { loc } = useParams();

  useEffect(() => {
    dispatch(getByplace(loc));
  }, [dispatch, loc]);

  return (
    <div style={{ marginBottom: 90 }}>
      <Typography variant="h3" align="center">
        SHOPS{" "}
      </Typography>
      {state.loading === true ? (
        <div className="sf">Loading</div>
      ) : state.loading === false && state.shops ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {state.shops && state.shops.length ? (
            state.shops.map((product, key) => (
              <ShopsCard key={key} {...product} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Shops Avaiable</div>
          )}
        </div>
      ) : (
        <div>No Shops Avaiable</div>
      )}
    </div>
  );
}

export default ShopByLocation;

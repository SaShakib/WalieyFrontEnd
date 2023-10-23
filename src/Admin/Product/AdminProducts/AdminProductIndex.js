import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../features/Products/products_index";
import AdminHeader from "../../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../../BottomNavigation/BottomNavigation.index";
import AdminProducts from "./AdminProducts";


function AdminProductIndex() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch, change]);
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container
        component="main"
        maxWidth="lg"
        style={{ marginBottom: "90px", padding: 0 }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Admin Products
        </Typography>
        <Grid container style={{ display: "flex", flexWrap: "wrap" }}>
          {products.loading === true ? (
            <>Loading</>
          ) : products.loading === false &&
            products.products &&
            products.products.length ? (
            products.products.map((product, key) => (
              <Grid key={key} item xs={12} sm={6} md={4}>
                <AdminProducts product={product} rerender={setChange} />
              </Grid>
            ))
          ) : (
            <>No Product Avaiable! Create Product</>
          )}
        </Grid>
      </Container>
     
    </div>
  );
}

export default AdminProductIndex;

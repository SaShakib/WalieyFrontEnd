import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@material-ui/lab/Skeleton";
import AdminHeader from "../../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../../BottomNavigation/BottomNavigation.index";
import AdminProducts from "./AdminProducts";
import axios from "../../axios";

function AdminProductIndex() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`/superAdmin/products?limit=30&page=${page}`).then((res) => {
      setProducts((p) => [...p, ...res.data.products]);
    });
  }, [page]);
  return (
    <div style={{marginBottom: 90}}>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container component="main" maxWidth="lg">
        <Typography variant="h3" gutterBottom align="center">
          Admin Products
        </Typography>
        <Grid container style={{ display: "flex", flexWrap: "wrap" }}>
          {products && products.length === 0 ? (
            <div style={{ width: "100%" }}>
              <>Loading</>
              <Skeleton variant="text" />
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" width={`100%`} height={118} />
            </div>
          ) : products && products.length ? (
            <InfiniteScroll
              dataLength={products.length}
              next={() => setPage((prev) => prev + 1)}
              hasMore={true}
              loader={
                <div style={{ width: "100%" }}>
                  <>Loading</>
                  <Skeleton variant="text" />
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="rect" width={`100%`} height={118} />
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Grid
                container
                justify="center"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {products.map((product, key) => (
                  <Grid key={key} item xs={12} sm={6} md={4}>
                    <AdminProducts product={product} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          ) : (
            <>No Product Avaiable! Create Product</>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default AdminProductIndex;

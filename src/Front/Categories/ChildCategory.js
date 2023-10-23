import { Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosIntance from "../../app/helpers/axios";
import { getBySlug } from "../../features/Category/category_index";
import Banner from "../Layout/Banner/Banner";
import ProductCardUI from "../Layout/Card/ProductCardUI";

function ChildCategory() {
  const { slug } = useParams();
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(getBySlug(slug));
    axiosIntance.get(`/category/${slug}?limit=15`).then((res) => {
      setProducts(res.data.products);
    });
    setPage(1);
  }, [dispatch, slug]);
  const fetchMore = () => {
    setPage((prev) => prev + 1);
    axiosIntance
      .get(`/category/${slug}?limit=15&page=${page}`)
      .then((res) => setProducts([...products, ...res.data.products]));
  };
  return (
    <div>
      {category && category.categories && category.categories.length ? (
        <Banner name="Category" category={category.categories} />
      ) : null}

      {products && products.length === 0 ? (
        <div style={{ width: "100%", padding: 40 }}>
          <>Loading</>
          <Skeleton variant="text" />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rect" width={`100%`} height={118} />
        </div>
      ) : products && products.length ? (
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
            Product
          </Typography>
          <Typography
            variant="body2"
            style={{ fontStyle: "italic" }}
            gutterBottom
            display="block"
            align="center"
            color="secondary"
          >
            Related Products On this Category
          </Typography>
          <br />
          <Grid
            container
            justify="center"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <InfiniteScroll
              dataLength={products.length}
              next={fetchMore}
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
                    <ProductCardUI {...product} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          </Grid>
        </div>
      ) : null}

      <br />
    </div>
  );
}

export default ChildCategory;

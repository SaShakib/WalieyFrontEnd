import { Avatar, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { useParams } from "react-router-dom";
import ProductCardUI from "../../Layout/Card/ProductCardUI";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosIntance from "../../../app/helpers/axios";

const useStyles = makeStyles((theme) => ({
  color: {
    color: theme.palette.getContrastText(theme.palette.primary.light),
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    padding: 20,
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    paddingLeft: 15,
  },
  icon: {
    height: "1rem",
    transform: `translate(-5px, 2px)`,
    width: "1rem",
  },
}));

function SingleShop() {
  const classes = useStyles();
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  let { id } = useParams();

  useEffect(() => {
    axiosIntance.get(`/shops/${id}?limit=15&page=${page}`).then((res) => {
      setProduct(res.data);
      setProducts((p) => [...p, ...res.data.products]);
    });
  }, [id, page]);

  return (
    <Container component="main" maxWidth="lg" style={{ padding: 0 }}>
      {" "}
      <div className={classes.root} style={{ marginBottom: 90 }}>
        {product === "" ? (
          <div>loading</div>
        ) : (
          <div className="secondRoot">
            <div className={classes.flex}>
              {product.admin ? (
                <div>
                  {product.admin.profilePicture ? (
                    <Avatar
                      src={product.admin.profilePicture.img}
                      variant="circle"
                    />
                  ) : null}
                </div>
              ) : null}
              <Avatar className={classes.color} variant="circle" />
              <div className={classes.item}>
                {`${product.admin.firstname} ${product.admin.lastname}`}
                <div style={{ paddingTop: 3 }}>
                  <LocationOnOutlinedIcon className={classes.icon} />
                  {product.admin.location
                    ? product.admin.location.place
                    : null}{" "}
                  {"   "}
                  {product.admin.details ? product.admin.details : null}
                </div>
              </div>
            </div>
            <div className={classes.product}>
              <Typography
                variant="h5"
                gutterBottom
                display="block"
                align="center"
                style={{ borderBottom: "2px solid #fff" }}
              >
                {product.admin.shopname}
              </Typography>

              <Grid container justify="center">
                {products && products.length ? (
                  <InfiniteScroll
                    dataLength={products.length}
                    next={() => setPage((prev) => prev + 1)}
                    hasMore={true}
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
                ) : (
                  <div> No products </div>
                )}
              </Grid>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default SingleShop;

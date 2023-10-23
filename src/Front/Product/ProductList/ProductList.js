import { Container, Grid, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardUI from "../../Layout/Card/ProductCardUI";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosIntance from "../../../app/helpers/axios";
import Banner from "../../Layout/Banner/Banner";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getColor } from "../../../features/Utils/index_color";
import { getSize } from "../../../features/Utils/index_size";
import Skeleton from "@material-ui/lab/Skeleton";

function ProductList() {
  const category = useSelector((state) => state.categories);
  const [product, setProduct] = useState([]);

  const [sort, setSort] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const ColorState = useSelector((state) => state.color);
  const SizeState = useSelector((state) => state.size);

  useEffect(() => {
    axiosIntance
      .get(`/products?limit=9&sort=${sort}&color=${color}&size=${size}`)
      .then((res) => setProduct(res.data.results));

    dispatch(getColor());
    dispatch(getSize());
  }, [dispatch, color, sort, size]);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
    axiosIntance
      .get(
        `/products?page=${page}&limit=9&sort=${sort}&color=${color}&size=${size}`
      )
      .then((res) => setProduct([...product, ...res.data.results]));
  };

  return (
    <div style={{ marginBottom: 90 }}>
      {category && category.categories && category.categories.length ? (
        <Banner name="PRODUCTS" category={category.categories} />
      ) : null}

      <Container component="main" maxWidth="lg" style={{ padding: 0 }}>
        <div>
          <Grid container style={{ marginBottom: 12 }}>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <div className="Color" style={{ padding: 12 }}>
                {ColorState && ColorState.colors && ColorState.colors.length ? (
                  <Paper
                    style={{
                      padding: "10px 12px",
                      width: "100%",
                      minWidth: "280px",
                      marginRight: 4,
                      boxShadow: "0px 0px 20px #00000026",
                      display: "flex",
                    }}
                    elevation={0}
                  >
                    <Autocomplete
                      id="colorSelect"
                      onChange={(value, newValue) =>
                        newValue === null
                          ? setColor("")
                          : setColor(newValue._id)
                      }
                      fullWidth
                      options={ColorState.colors}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                          placeholder="Filter By Color"
                          fullWidth
                          variant="standard"
                        />
                      )}
                    />
                  </Paper>
                ) : null}
              </div>
              <div className="Sizes" style={{ padding: 12 }}>
                {SizeState && SizeState.sizes && SizeState.sizes.length ? (
                  <Paper
                    style={{
                      padding: "10px 12px",
                      width: "100%",
                      minWidth: "280px",
                      boxShadow: "0px 0px 20px #00000026",
                      display: "flex",
                    }}
                    elevation={0}
                  >
                    <Autocomplete
                      id="SizeSelect"
                      onChange={(value, newValue) =>
                        newValue === null ? setSize("") : setSize(newValue._id)
                      }
                      fullWidth
                      options={SizeState.sizes}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                          placeholder="Filter By Size"
                          fullWidth
                          variant="standard"
                        />
                      )}
                    />
                  </Paper>
                ) : null}
              </div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ alignSelf: "center" }}>
              <div className="Sizes" style={{ padding: 12 }}>
                <select
                  name="orderby"
                  aria-label="Shop order"
                  style={{ padding: "10px 20px" }}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="" defaultChecked>
                    Default sorting
                  </option>
                  <option value="LowPrice">Sort by price: low to high</option>
                  <option value="HighPrice">Sort by price: high to low</option>
                  <option value="nameAsce">Sort by Name: A to Z</option>
                  <option value="nameDesc">Sort by Name: Z to A</option>
                </select>
              </div>
            </Grid>
          </Grid>
        </div>
        <div>
          {product && product.length === 0 ? (
            <div style={{ width: "100%", padding: 40 }}>
              <>Loading</>
              <Skeleton variant="text" />
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" width={`100%`} height={118} />
            </div>
          ) : product && product.length ? (
            <InfiniteScroll
              dataLength={product.length}
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
                {product.map((product, key) => (
                  <Grid key={key} item xs={12} sm={6} md={4}>
                    <ProductCardUI {...product} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

export default ProductList;

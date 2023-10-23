import React, { useEffect } from "react";
import SliderIndex from "./Slider/SliderIndex";
import CategoryIndex from "./Category/CategoryIndex";
import ProductsIndex from "./Products/ProductsIndex";
import ShopsIndex from "./Shops/ShopsIndex";
import LocationIndex from "./Locations/LocationIndex";
import { useDispatch, useSelector } from "react-redux";
import { getinitial } from "../../features/Home/home.index";
import { useCallback } from "react";
import { TopCategory } from "../../features/Category/category_index";
import { getSlider } from "../../features/SuperAdmin";
import { Container } from "@material-ui/core";

function Home() {
  const state = useSelector((state) => state.home);
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const initial = useCallback(() => {
    dispatch(getinitial());
    dispatch(TopCategory());
    dispatch(getSlider());
  }, [dispatch]);
  useEffect(() => {
    initial();
  }, [initial]);

  return (
    <div style={{ marginBottom: 90 }}>
      <Container maxWidth="xl" component="main">
        <SliderIndex />
        <Container maxWidth="lg">

        
        {categories.loading === false &&
        categories.categories &&
        categories.categories.length ? (
          <CategoryIndex categories={categories.categories} />
        ) : null}

        {state.loading === true ? (
          <div className="">loading</div>
        ) : (
          <div>
            {state.loading === false &&
            state.products &&
            state.shops &&
            state.featured &&
            state.bestseller ? (
              <div className="">
                <ProductsIndex
                  bestseller={state.bestseller}
                  featured={state.featured}
                />
                <ShopsIndex shops={state.shops} />
                <LocationIndex />
              </div>
            ) : null}
          </div>
        )}
        </Container>
      </Container>
    </div>
  );
}

export default Home;

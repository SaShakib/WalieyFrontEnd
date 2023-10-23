import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "../features/Products/products_index";
import singleProduct from "../features/Products/SingleProduct";
import auth from "../features/Admin/AdminAuth";
import AdminRegistration from "../features/Admin/AdminRegistration";
import categories from "../features/Category/category_index";
import shops from "../features/Shops/index_shops";
import size from "../features/Utils/index_size";
import location from "../features/Utils/index_location";
import color from "../features/Utils/index_color";
import featured from "../features/Utils/featured";
import bestseller from "../features/Utils/bestSeller";
import homereducer from "../features/Home/home.index";
import Cart from "../features/Cart/CartRedux";
import checkout from "../features/Order/Checkout/index.checkout";
import superAdmin from "../features/SuperAdmin/index";

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    products: productReducer,
    singleProduct: singleProduct,
    auth,
    registration: AdminRegistration,
    categories,
    shops,
    checkout,
    size,
    location,
    color,
    featured,
    bestseller,
    home: homereducer,
    Cart,
    superAdmin,
  },
});

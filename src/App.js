import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FrontBottomNavigation from "./Front/Layout/BottomNavigation/BottomNavigation.index";
import HeaderIndex from "./Front/Layout/Header/headerIndex";
import "./App.css";
import SuperAdmin from "./SuperAdmin/SuperAdmin";
import PrivateRoute from "./app/PrivateRoute";
import { isUserLoggedIn } from "./features/Admin/AdminAuth";
import LogoComp from "./Front/Layout/Header/LogoComp";
import Facebook from "./facebook";
const AdminCategoryIndex = React.lazy(() =>
  import("./Admin/Category/AdminCategoryIndex")
);
const AdminColorIndex = React.lazy(() =>
  import("./Admin/Color/AdminColorIndex")
);
const AdminLocationIndex = React.lazy(() =>
  import("./Admin/Location/AdminLocationIndex")
);
const Orders = React.lazy(() => import("./Admin/Order/Orders"));
const AddProductStepper = React.lazy(() =>
  import("./Admin/Product/AddProduct/AddProductStepper")
);
const AdminProductIndex = React.lazy(() =>
  import("./Admin/Product/AdminProducts/AdminProductIndex")
);
const ProductCreate = React.lazy(() => import("./Admin/Product/ProductCreate"));
const AdminSizeIndex = React.lazy(() => import("./Admin/Size/AdminSizeIndex"));
const SignIn = React.lazy(() => import("./Admin/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./Admin/SignUp/SignUp"));

const ShopByLocation = React.lazy(() =>
  import("./Front/Shops/All Shops/ShopByLocation")
);

const Cart = React.lazy(() => import("./Front/Cart/Cart"));
const ChildCategory = React.lazy(() =>
  import("./Front/Categories/ChildCategory")
);
const ParentCategory = React.lazy(() =>
  import("./Front/Categories/ParentCategory")
);
const Checkout = React.lazy(() => import("./Front/Checkout/CheckOut"));
const Home = React.lazy(() => import("./Front/Home/Home"));
const LocationIndex = React.lazy(() => import("./Front/Location/LocationList"));
const ProductList = React.lazy(() =>
  import("./Front/Product/ProductList/ProductList")
);
const SingleProductIndex = React.lazy(() =>
  import("./Front/Product/SingleProduct/SingleProductIndex")
);

const ShopList = React.lazy(() => import("./Front/Shops/All Shops/ShopList"));
const SingleShop = React.lazy(() =>
  import("./Front/Shops/All Shops/SingleShop")
);

export default function App() {
  const dispatch = useDispatch();

  const token = window.localStorage.getItem("token");
  const users = window.localStorage.getItem("user");
  const user = JSON.parse(users);

  if (!token && !user) {
    dispatch(isUserLoggedIn());
  }
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <LogoComp />
        <Switch>
          <Route path={`/shops/:id`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <SingleShop />
          </Route>

          <Route path={`/ShopsByLocation/:loc/:id`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <SingleShop />
          </Route>

          <Route path={`/shops`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <ShopList />
          </Route>

          <Route path={`/ShopsByLocation/:loc`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <ShopByLocation />
          </Route>

          <Route path={`/Locations`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <LocationIndex />
          </Route>
          <Route path={`/Category/child/:slug`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <ChildCategory />
          </Route>
          <Route path={`/Category/:id`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <ParentCategory />
          </Route>

          <Route path={`/Products/:id`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <SingleProductIndex />
          </Route>

          <Route path={`/Products`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <ProductList />
          </Route>
          <Route path={`/Cart`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <Cart />
          </Route>
          <Route path={`/Checkout`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <Checkout />
          </Route>
          <Route path={`/facebook`}>
            <Facebook/>
          </Route>

          <Route exact path={`/`}>
            <HeaderIndex />
            <FrontBottomNavigation />
            <Home />
          </Route>
          <Route exact path={`/admin/SignUp`}>
            <SignUp />
          </Route>
          <Route exact path={`/admin/Login`} component={SignIn} />

          <PrivateRoute exact path="/admin" component={AdminProductIndex} />

          <PrivateRoute
            path={`/admin/UpdateProduct/:id`}
            component={ProductCreate}
          />
          <PrivateRoute
            path={`/admin/CreateProducts`}
            component={AddProductStepper}
          />

          <PrivateRoute
            path={`/admin/Category`}
            component={AdminCategoryIndex}
          />

          <PrivateRoute path={`/admin/Color`} component={AdminColorIndex} />
          <PrivateRoute path={`/admin/Size`} component={AdminSizeIndex} />
          <PrivateRoute
            path={`/admin/Location`}
            component={AdminLocationIndex}
          />
          <PrivateRoute path={`/admin/orders`} component={Orders} />

          <Route path="/SuperAdmin">
            <SuperAdmin />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

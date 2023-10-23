import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminCategoryIndex from "./Category/AdminCategoryIndex";
import AdminColorIndex from "./Color/AdminColorIndex";
import AdminLocationIndex from "./Location/AdminLocationIndex";

import AdminProductIndex from "./Product/AdminProducts/AdminProductIndex";

import AdminSizeIndex from "./Size/AdminSizeIndex";

import SignIn from "./SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";
import Orders from "./Order/Orders";
import SliderIndex from "./Slider/SliderIndex";

function SuperAdmin() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`/SuperAdmin/Login`} component={SignIn} />
        <PrivateRoute
          path="/SuperAdmin/WalieyAdmin/Slider"
          component={SliderIndex}
        />
        <PrivateRoute
          exact
          path="/SuperAdmin/WalieyAdmin"
          component={AdminProductIndex}
        />

        <PrivateRoute
          path={`/SuperAdmin/WalieyAdmin/Category`}
          component={AdminCategoryIndex}
        />

        <PrivateRoute
          path={`/SuperAdmin/WalieyAdmin/Color`}
          component={AdminColorIndex}
        />
        <PrivateRoute
          path={`/SuperAdmin/WalieyAdmin/Size`}
          component={AdminSizeIndex}
        />
        <PrivateRoute
          path={`/SuperAdmin/WalieyAdmin/Location`}
          component={AdminLocationIndex}
        />
        <PrivateRoute
          path={`/SuperAdmin/WalieyAdmin/orders`}
          component={Orders}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default SuperAdmin;

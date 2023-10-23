import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import OrderProducts from "./OrderProducts";
import axiosIntance from "../../app/helpers/axios";

import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";
import AdminHeader from "../AdminHeader/AdminHeader";

function Orders() {
  const [orders, setOrders] = useState("");
  let product;
  useEffect(() => {
    axiosIntance.get("/checkout/orders").then((res) => setOrders(res.data));
  }, []);

  if (orders && orders.success && orders.success.length) {
    let products = [];
    orders.success.map((prod) => {
      return prod.product.cartItem.filter((ord) =>
        ord.createdBy === orders.admin ? products.push(ord) : null
      );

      // {
      //   if (ord.createdBy === orders.admin) {
      //    products.push(ord);
      //   }
      // });
      // });
    });
    if (products.length) {
      product = products;
    }
  }

  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Typography align="center" variant="h2">
        Orders
      </Typography>
      <Container maxWidth="xs" style={{ marginBottom: "90px" }}>
        <div>
          {product && product.length
            ? product.map((order, key) => (
                <OrderProducts key={key} {...order} />
              ))
            : null}
        </div>
      </Container>
    </div>
  );
}

export default Orders;

import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSuperAdminOrders,
  SuperAdminDeleteOrder,
} from "../../features/SuperAdmin";
import OrderProducts from "./OrderProducts";
import DeleteIcon from "@material-ui/icons/Delete";
import AdminHeader from "../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";

const useStyle = makeStyles((theme) => ({
  Paper: {
    marginTop: theme.spacing(2),
    boxShadow: "0px 0px 20px #00000026",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    borderRadius: 24,
    paddingLeft: 0,
    paddingRight: 0,
  },
  details: {
    padding: `15px`,
  },
  name: {
    fontFamily: "sans",
    paddingTop: 4,
    fontStyle: "italic",
  },
}));

function Orders() {
  const classes = useStyle();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuperAdminOrders());
  }, [dispatch]);

  const order = useSelector((state) => state.superAdmin);

  const handleDelete = (e) => {
    dispatch(SuperAdminDeleteOrder(e));
  };
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />

      <Typography align="center" variant="h2">
        Orders
      </Typography>
      {order && order.order && order.order.length
        ? order.order.map((order, key) => (
            <Container
              key={key}
              component={Paper}
              maxWidth="md"
              elevation={0}
              className={classes.Paper}
            >
              <Grid
                container
                justify="space-between"
                spacing={1}
                style={{ alignItems: "center" }}
              >
                {order.product.cartItem && order.product.cartItem.length
                  ? order.product.cartItem.map((product, key) => (
                      <Grid key={key} item xs={12} sm={6}>
                        <OrderProducts {...product} />
                      </Grid>
                    ))
                  : null}

                <Grid item xs={12} sm={6}>
                  <div className={classes.details}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h5" color="secondary">
                        Total: ৳{order.product.totalAmount}
                      </Typography>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(order._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <Typography variant="h5" color="secondary">
                      Shiping: {order.product.shiping}
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.name}
                      color="secondary"
                    >
                      Name: {order.fullname}
                    </Typography>

                    <Typography
                      variant="h5"
                      className={classes.name}
                      color="secondary"
                    >
                      Phone: {order.phone}
                    </Typography>
                    <Typography
                      variant="h5"
                      className={classes.name}
                      color="secondary"
                    >
                      <address>Address1: {order.address1}</address>
                      {order.address2 ? (
                        <address>Address2: {order.address2}</address>
                      ) : null}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Container>
          ))
        : null}
    </div>
  );
}

export default Orders;

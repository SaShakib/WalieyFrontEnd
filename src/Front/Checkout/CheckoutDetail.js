import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import ShipingRadio from "./ShipingRadio";

import { useSelector } from "react-redux";

function CheckoutDetail() {
  const state = useSelector((state) => state.Cart);

  return (
    <div>
      <Paper
        style={{
          padding: 15,
          maxWidth: 350,
          minWidth: 250,
          
        }}
        elevation={0}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Your Order
        </Typography>
        <Grid container>
          {/* First Line */}
          <Grid
            container
            justify="space-between"
            className="first"
            style={{ borderBottom: "1px solid #27e6f3cf" }}
          >
            <Grid item xs={6}>
              <Typography variant="body1" align="left" gutterBottom>
                PRODUCTS
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" align="right" gutterBottom>
                SUBTOTAL
              </Typography>
            </Grid>
          </Grid>

          {/* Second line */}
          {state.cartItem && state.cartItem.length > 0
            ? state.cartItem.map((item, key) => (
                <Grid
                  container
                  key={key}
                  justify="space-between"
                  style={{
                    borderBottom: "1px solid grey",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      align="left"
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.name} x {item.quantity} {item.color ? `- ${item.color}`: null} {item.size ? `- ${item.size}`: null}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      align="right"
                      color="textSecondary"
                      gutterBottom
                    >
                      ৳{item.total}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            : null}

          {/* Thirdd Line */}

          <Grid
            justify="space-between"
            container
            style={{
              borderBottom: "1px solid grey",
              paddingTop: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="left"
                color="primary"
                gutterBottom
              >
                SUBTOTAL PRICE
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="right"
                color="primary"
                gutterBottom
              >
               ৳{state.totalAmount > 0 ? state.totalAmount : 0}
              </Typography>
            </Grid>
          </Grid>
          {/* Fourth Line */}

          <Grid
            justify="space-between"
            container
            style={{
              borderBottom: "1px solid grey",
              paddingTop: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="body1" align="left" gutterBottom>
                SHIPPING
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ShipingRadio />
            </Grid>
          </Grid>
          {/* Five  */}
          <Grid
            container
            justify="space-between"
            style={{
              borderBottom: "1px solid grey",
              paddingTop: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="h5" align="left" gutterBottom>
                TOTAL
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                align="right"
                gutterBottom
                color="primary"
              >
                ৳{state.totalAmount > 0 ? state.totalAmount : 0}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            style={{ paddingTop: 10 }}
            variant="subtitle2"
            align="center"
          >
            WE ONLY SUPPORT CASH ON DELIVERY NOW!
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}

export default CheckoutDetail;

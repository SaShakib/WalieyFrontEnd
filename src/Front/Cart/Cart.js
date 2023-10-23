import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import CartComp from "./CartComp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const state = useSelector((state) => state.Cart);
  return (
    <div style={{marginBottom: 90}}>
      <Grid justify="space-evenly" wrap="wrap" container>
        <Grid item xs={12} sm={8} style={{ paddingLeft: 8 }}>
          {state.cartItem && state.cartItem.length > 0 ? (
            <CartComp item={state.cartItem} total={state.totalAmount} />
          ) : (
            <>No Product in Cart</>
          )}
        </Grid>
        <Grid item xs={12} sm={4} style={{ paddingLeft: 12, marginTop: 55 }}>
          <Paper
            style={{
              padding: 15,
              marginRight: 10,
              boxShadow: "0px 0px 15px #00000026"
            }}
            elevation={0}
          >
            <Typography
              style={{ borderBottom: "1px solid grey" }}
              variant="h6"
              color="primary"
              align="center"
              gutterBottom
            >
              Checkout
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <Typography variant="h6">SUBTOTAL:</Typography>
              <Typography variant="h6" color="primary">
                {state.totalAmount ? state.totalAmount : 0}
              </Typography>
            </div>
            <Button
              variant="outlined"
              color="secondary"
              align="center"
              fullWidth
              component={Link}
              to="/checkout"
            >
              CHECKOUT
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;

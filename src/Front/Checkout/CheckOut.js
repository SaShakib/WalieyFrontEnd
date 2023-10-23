import { Grid } from "@material-ui/core";
import React from "react";
import AddressForm from "./AddressFrom";
import CheckoutDetail from "./CheckoutDetail";

function Checkout() {
  return (
    <div style={{marginBottom: 90}}>
      <Grid justify="space-evenly" wrap='wrap' container >
        <Grid item xs={12} sm={5} style={{ padding: 20 }}>
          <AddressForm />
        </Grid>

        <Grid
          style={{  padding: 20 }}
          item
          xs={12}
          sm={5}
          
        >
          <CheckoutDetail />
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;

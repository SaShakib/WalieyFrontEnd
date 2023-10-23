import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutPost } from "../../features/Order/Checkout/index.checkout";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../features/Cart/CartRedux";

export default function AddressForm() {
  const [fullname, setFullname] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const product = useSelector((state) => state.Cart);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { fullname, address1, address2, phone, product };

    if (product.cartItem) {
      dispatch(CheckoutPost(order));
      dispatch(clearCart());
      setFullname("");
      setAddress1("");
      setAddress2("");
      setPhone("");

      history.push("/");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} method="post" style={{ maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Buyer address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="fullname"
              name="fullname"
              label="Full Name"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Phone"
              name="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="Enter Phone"
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={handleSubmit}
            >
              Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

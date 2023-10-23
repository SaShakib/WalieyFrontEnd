import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../../features/Admin/AdminRegistration";
import { Link, Redirect, useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect } from "react";
import { getlocation } from "../../features/Utils/index_location";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [shopname, setShopname] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const token = window.localStorage.getItem("token");
  const users = window.localStorage.getItem("user");
  const user = JSON.parse(users);
  const usehistory = useHistory();
  const LocationState = useSelector((state) => state.location);
  const Registration = useSelector((state) => state.registration);
  useEffect(() => {
    dispatch(getlocation());
  }, [dispatch]);
  if (token && user && user.shopname && user._id) {
    return <Redirect to={`/admin`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("firstname", firstname);
    form.append("lastname", lastname);

    form.append("password", password);
    form.append("shopname", shopname);
    form.append("phone", phone);
    form.append("details", details);
    form.append("profilePic", profilePic);

    if (location !== "" && location !== []) {
      form.append("location", location);
    }

    dispatch(Signup(form));
    setFirstname("");
    setLastname("");
    setLocation("");
    setProfilePic("");
    setPassword("");
    setPhone("");
    setShopname("");
    setDetails("");
    setPassword("");
    usehistory.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          CREATE SHOP
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Shop"
                label="Shop Name"
                name="shop"
                onChange={(e) => setShopname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                
                id="details"
                label="Shop Details"
                name="Details"
                autoComplete="phone"
                onChange={(e) => setDetails(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {LocationState &&
              LocationState.locations &&
              LocationState.locations.length ? (
                <Autocomplete
                  id="color"
                  // key={change}
                  onChange={(value, newValue) => {
                    setLocation(newValue._id);
                  }}
                  options={LocationState.locations}
                  getOptionLabel={(option) => option.place}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      variant="outlined"
                      placeholder="Select Your Location"
                    />
                  )}
                />
              ) : null}
            </Grid>
            <Grid item xs={12} align="center">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span">
                  Upload
                </Button>
              </label>{" "}
              {profilePic ? profilePic.name : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/admin/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {Registration &&
        Registration.loading === false &&
        Registration.message ? (
          <div>{Registration.message}</div>
        ) : null}
      </div>
    </Container>
  );
}

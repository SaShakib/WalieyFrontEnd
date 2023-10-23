import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { SuperAdminLogin } from "../../features/SuperAdmin";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const superadmin = useSelector((state) => state.superAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { user, password };
    dispatch(SuperAdminLogin(form));
  };
  const token = window.localStorage.getItem("token");
  const superAdmin = window.localStorage.getItem("superAdmin");

  if (token && superAdmin === "true") {
    return <Redirect to="/SuperAdmin/WalieyAdmin" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="user Name"
            name="user"
            autoComplete="user"
            autoFocus
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {superadmin && superadmin.error ? <div>{superadmin.error}</div> : null}
      </div>
    </Container>
  );
}

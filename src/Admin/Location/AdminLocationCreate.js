import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Createlocation, getlocation } from "../../features/Utils/index_location";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    boxShadow: "0px 0px 20px #00000026",
    display: "flex",
    flexDirection: "column",
    minWidth:420,
    borderRadius: 12,
    alignItems: "center",
  },
  paperContent: {
    margin: `12px 0px`,
    padding: "10px 12px",
    width: "100%",
    boxShadow: "0px 0px 20px #00000026",
    borderRadius: 24,
    display: "flex",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AdminLocationCreate() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const [place, setPlace] = useState("");
  const [zilla, setZilla] = useState("");
  const [upozilla, setUpozilla] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const loc = { place, zilla, upozilla };
    dispatch(Createlocation(loc));
    dispatch(getlocation())
    setPlace("");
    setZilla("");
    setUpozilla("");
    dispatch(getlocation())
  };
  return (
    <Container
      component={Paper}
      className={classes.paper}
      elevation={0}
      maxWidth="xs"
    >
      <Typography style={{ marginTop: 8 }} component="h1" variant="h5">
        Create Location
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              className={classes.paperContent}
              style={{ margin: 0 }}
              elevation={0}
            >
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                name="place"
                id="place"
                style={{ paddingLeft: 12 }}
                autoFocus
                required
                placeholder="Add Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              className={classes.paperContent}
              style={{ margin: 0 }}
              elevation={0}
            >
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                name="zilla"
                id="zilla"
                style={{ paddingLeft: 12 }}
                autoFocus
                required
                placeholder="Add Zilla"
                value={zilla}
                onChange={(e) => setZilla(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              className={classes.paperContent}
              style={{ margin: 0 }}
              elevation={0}
            >
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                style={{ paddingLeft: 12 }}
                autoFocus
                required
                placeholder="Add UpoZilla"
                fullWidth
                variant="standard"
                name="upozilla"
                id="upozilla"
                value={upozilla}
                onChange={(e) => setUpozilla(e.target.value)}
              />
            </Paper>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Create location
        </Button>
      </form>
      {location.loading === false && location.message ? (
        <Typography color="primary">{location.message}</Typography>
      ) : null}
    </Container>
  );
}

export default AdminLocationCreate;

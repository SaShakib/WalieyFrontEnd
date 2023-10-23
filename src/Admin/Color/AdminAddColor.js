import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { SketchPicker } from "react-color";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { CreateColor, getColor } from "../../features/Utils/index_color";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    boxShadow: "0px 0px 20px #00000026",
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    minWidth: 360,
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

function AdminAddColor() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color);

  const [name, setName] = useState("");
  const [hex, sethex] = useState("#fff");
  const handleSubmit = (e) => {
    e.preventDefault();

    const color = { name, hex };

    dispatch(CreateColor(color));
    dispatch(getColor());
    sethex("");

    setName("");
    dispatch(getColor());
  };
  return (
    <Container component={Paper} className={classes.paper} maxWidth="xs">
      <Typography style={{ marginTop: 8 }} component="h1" variant="h5">
        Create Color
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
                style={{ paddingLeft: 12 }}
                autoComplete="fname"
                placeholder="Add Color Name"
                variant="standard"
                required
                fullWidth
                id="Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography
              style={{ marginTop: 8, marginBottom: 8 }}
              align="center"
              component="h1"
              variant="h5"
            >
              Choose Color
            </Typography>
            <SketchPicker
              color={hex}
              onChange={(color, event) => sethex(color.hex)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Create Color
        </Button>
      </form>
      {color.loading === false && color.message ? (
        <Typography color="primary">{color.message}</Typography>
      ) : null}
    </Container>
  );
}

export default AdminAddColor;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { CreateSize } from "../../features/Utils/index_size";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    minWidth: 280,
    boxShadow: "0px 0px 20px #00000026",
    display: "flex",
    flexDirection: "column",
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

function AdminAddSize() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const size = useSelector((state) => state.size);
  const [sizeName, setsizeName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const size = { name: sizeName };
    dispatch(CreateSize(size));
    setsizeName("");
  };
  return (
    <Container
      component={Paper}
      
      className={classes.paper}
      maxWidth="sm"
    >
      <Typography style={{ marginTop: 8 }} component="h1" variant="h5">
        Create Size
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
                name="size"
                id="size"
                style={{ paddingLeft: 12 }}
                autoFocus
                required
                placeholder="Add Size"
                value={sizeName}
                onChange={(e) => setsizeName(e.target.value)}
                fullWidth
                variant="standard"
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
          Create Size
        </Button>
      </form>
      {size.loading === false && size.message ? (
        <Typography color="primary">{size.message}</Typography>
      ) : null}
    </Container>
  );
}

export default AdminAddSize;

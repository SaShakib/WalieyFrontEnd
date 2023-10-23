import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";

import { Paper } from "@material-ui/core";
import { CreateCat } from "../../features/Category/category_index";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect } from "react";
import axiosIntance from "../../app/helpers/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    minWidth: 320,
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
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [parentId, setParentId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("categoryImage", categoryImage);
    if (parentId !== "") {
      form.append("parentId", parentId);
    }
    dispatch(CreateCat(form));
    setCategoryImage("");

    setName("");
  };
  useEffect(() => {
    axiosIntance
      .get("/category")
      .then((res) => setCategory(res.data.categoryList));
  }, []);
  return (
    <Container component={Paper} className={classes.paper} maxWidth="sm">
      <Typography style={{ marginTop: 8 }} component="h1" variant="h5">
        Create Category
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
                name="Category"
                id="Category"
                style={{ paddingLeft: 12 }}
                autoFocus
                required
                placeholder="Add Category"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} align="center">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              files={categoryImage}
              onChange={(e) => setCategoryImage(e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
              <Button variant="outlined" color="primary" component="span">
                Add Photo
              </Button>
            </label>
            {categoryImage ? categoryImage.name : null}
          </Grid>
          <Grid item xs={12} align="center">
            <Paper className={classes.paperContent} elevation={0}>
              {category && category.length ? (
                <>
                  <Autocomplete
                    id="CategoryComp"
                    onChange={(value, newValue) =>
                      newValue === null
                        ? setParentId("")
                        : setParentId(newValue._id)
                    }
                    fullWidth
                    options={category}
                    disableClearable
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                          endAdornment: <></>,
                        }}
                        placeholder="Add Category"
                        fullWidth
                        variant="standard"
                      />
                    )}
                  />
                </>
              ) : null}
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
          Create Category
        </Button>
      </form>
      {categories.loading === false && categories.message ? (
        <Typography color="primary">{categories.message}</Typography>
      ) : null}
    </Container>
  );
}

export default AdminAddSize;

import {
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import ColorLensRoundedIcon from "@material-ui/icons/ColorLensRounded";
import FormatSizeRoundedIcon from "@material-ui/icons/FormatSizeRounded";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";

const useStyle = makeStyles((theme) => ({
  Paper: {
    backgroundColor: "#fafafa",
    padding: 16,
    justifyContent: "center",
    justifyItems: "center",
    borderRadius: 12,
    boxShadow: "0px 0px 20px #00000026",
  },
  paperContent: {
    margin: `12px 0px`,
    padding: "10px 12px",
    width: "100%",
    boxShadow: "0px 0px 20px #00000026",
    borderRadius: 12,
    display: "flex",
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#fff",
    },
  },
}));

export default function AddProduct(props) {

  return (
    <Container component="main" maxWidth="md">
        <CategoryComp
          category={props.category}
          categoryOpt={props.categoryOpt}
        />
        <ColorComp colors={props.colors} colorOpt={props.colorOpt} />
        <SizeComp sizes={props.sizes} sizeOpt={props.sizeOpt} />
        <PriceComp price={props.price} sale_price={props.sale_price} />
    </Container>
  );
}

export const CategoryComp = (props) => {
  const classes = useStyle();
  return (
    <Paper className={classes.paperContent} elevation={0}>
      {props.categoryOpt &&
      props.categoryOpt.loading === false &&
      props.categoryOpt.categories ? (
        <>
          <CategoryRoundedIcon style={{ marginRight: 8 }} color="secondary" />
          <Autocomplete
            id="CategoryComp"
            onChange={(value, newValue) => props.category(newValue)}
            multiple
            fullWidth
            options={props.categoryOpt.categories}
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
  );
};
const ColorComp = (props) => {
  const classes = useStyle();
  return (
    <Paper
      className={classes.paperContent}
      style={{ background: "#292D36" }}
      elevation={0}
    >
      {props.colorOpt &&
      props.colorOpt.loading === false &&
      props.colorOpt.colors ? (
        <>
          <ColorLensRoundedIcon style={{ marginRight: 8, color: "#fff" }} />
          <Autocomplete
            id="ColorComp"
            multiple
            onChange={(value, newValue) => props.colors(newValue)}
            fullWidth
            options={props.colorOpt.colors}
            disableClearable
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  endAdornment: <></>,
                  classes: { input: classes["input"] },
                }}
                placeholder="Add Colors"
                fullWidth
                variant="standard"
              />
            )}
          />
        </>
      ) : null}
    </Paper>
  );
};

const SizeComp = (props) => {
  const classes = useStyle();
  return (
    <Paper className={classes.paperContent} elevation={0}>
      {props.sizeOpt &&
      props.sizeOpt.loading === false &&
      props.sizeOpt.sizes ? (
        <>
          <FormatSizeRoundedIcon style={{ marginRight: 8 }} color="secondary" />
          <Autocomplete
            id="SizeComp"
            multiple
            onChange={(value, newValue) => props.sizes(newValue)}
            fullWidth
            options={props.sizeOpt.sizes}
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
                placeholder="Add Sizes"
                fullWidth
                variant="standard"
              />
            )}
          />
        </>
      ) : null}
    </Paper>
  );
};

const PriceComp = (props) => {
  const classes = useStyle();
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Paper
          className={classes.paperContent}
          style={{ margin: 0 }}
          elevation={0}
        >
          <AttachMoneyRoundedIcon
            style={{ marginRight: 8 }}
            color="secondary"
          />
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Add Price"
            fullWidth
            variant="standard"
            onChange={(e) => props.price(e.target.value)}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          className={classes.paperContent}
          style={{ margin: 0 }}
          elevation={0}
        >
          <AttachMoneyRoundedIcon
            style={{ marginRight: 8 }}
            color="secondary"
          />
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Add Sale Price"
            onChange={(e) => props.sale_price(e.target.value)}
            fullWidth
            variant="standard"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import axiosIntance from "../../../app/helpers/axios";
import { generatePublicUrl } from "../../../urlConfig";

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
    borderRadius: 24,
    display: "flex",
  },
  media: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0px 0px 20px #00000026",
  },
}));
function ProductStart(props) {
  const handleFiles = (e) => {
    const file = e.target.files;

    const bodyFormData = new FormData();

    for (let i = 0; i < file.length; i++) {
      bodyFormData.append("ProductImage", file.item(i));
    }

    axiosIntance
      .post("/products/upload", bodyFormData)
      .then((response) => {
        props.productPictures(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyle();
  return (
    <Container component="main" maxWidth="md">
      <Paper
        className={classes.paperContent}
        style={{ margin: 0 }}
        elevation={0}
      >
        <TextField
          InputProps={{
            disableUnderline: true,
          }}
          placeholder="Product Name"
          fullWidth
          style={{ paddingLeft: 8 }}
          variant="standard"
          onChange={(e) => props.name(e.target.value)}
        />
      </Paper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            multiple
            onChange={handleFiles}
          />
          <label htmlFor="contained-button-file">
            <Button color="secondary" component="span">
              <AddAPhotoRoundedIcon />
            </Button>
          </label>
        </div>

        <Typography variant="caption" align="center" color="secondary">
          Add Photo
        </Typography>
      </div>
      {props.productPicture.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              axiosIntance
                .delete(`/products/upload/${props.productPicture[0].img}`)
                .then((response) => console.log(response.data))
                .catch((err) => console.log(err));
              props.productPictures("");
            }}
          >
            Delete
          </Button>

          <div>
            <img
              className={classes.media}
              height="600px"
              width="400px"
              src={generatePublicUrl(props.productPicture[0].img)}
              alt="Nothing"
            />
          </div>
        </div>
      ) : null}
    </Container>
  );
}

export default ProductStart;

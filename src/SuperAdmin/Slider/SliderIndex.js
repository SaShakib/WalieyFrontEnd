import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSlider } from "../../features/SuperAdmin";
import { generatePublicUrl } from "../../urlConfig";
import AdminHeader from "../AdminHeader/AdminHeader";
import Superaxios from "../axios";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";

function SliderIndex() {
  const [slider, setSlider] = React.useState("");
  const sliders = useSelector((state) => state.superAdmin.sliders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSlider());
  }, [slider, dispatch]);

  const handleDelete = (e) => {
    console.log(e);
    Superaxios.delete(`/slider/delete/${e}`).then((res) => setSlider(res.data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("slider", slider);
    Superaxios.post("/slider/upload", bodyFormData).then((res) =>
      setSlider(res.data)
    );
  };
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Typography>Add Image</Typography>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={(e) => setSlider(e.target.files[0])}
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" color="primary" component="span">
              Add Photo
            </Button>
          </label>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
          {slider && slider.name ? slider.name : null}
        </form>
        <Typography align="center" color="error" variant="h4">
          {slider && slider.message ? slider.message : null}
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>

              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sliders && sliders.length
              ? sliders.map((row, key) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      <img
                        src={generatePublicUrl(row.slider)}
                        alt="nothing"
                        width="90%"
                      />
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        size="medium"
                        color="secondary"
                        onClick={() => handleDelete(row._id)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default SliderIndex;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getlocation } from "../../features/Utils/index_location";
import { SuperAdminDeletelocation } from "../../features/SuperAdmin";

const useStyles = makeStyles({
  table: {
    minWidth: 280,
    boxShadow: "0px 0px 20px #00000026",
    marginTop: 10,
    borderRadius: 12,
  },
});

export default function AdminLocationList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getlocation());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(SuperAdminDeletelocation(e));
    dispatch(getlocation());
  };
  return (
    <Container
      component={Paper}
      maxWidth="xs"
      elevation={0}
      className={classes.table}
    >
      <Typography
        style={{ marginTop: 12, paddingTop: 12 }}
        gutterBottom
        align="center"
        component="h1"
        variant="h5"
      >
        Location List
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell align="center">Upozilla</TableCell>
            <TableCell align="center">Zilla</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.loading === false && rows.locations && rows.locations.length
            ? rows.locations.map((row) => (
                <TableRow key={row.place}>
                  <TableCell component="th" scope="row">
                    {row.place}
                  </TableCell>
                  <TableCell align="center">{row.upozilla}</TableCell>
                  <TableCell align="center">{row.zilla}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Container>
  );
}

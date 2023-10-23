import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getSize } from "../../features/Utils/index_size";
import { SuperAdminDeletesize } from "../../features/SuperAdmin";

const useStyles = makeStyles({
  table: {
    minWidth: 280,
    boxShadow: "0px 0px 20px #00000026",
    marginTop: 10,
    borderRadius: 12,
  },
});

export default function AdminSizeList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.size);
  useEffect(() => {
    dispatch(getSize());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(SuperAdminDeletesize(e));
    dispatch(getSize());
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
        Size List
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>

            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.loading === false && rows.sizes && rows.sizes.length
            ? rows.sizes.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton color="secondary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(row._id)}
                    >
                      <DeleteIcon />
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

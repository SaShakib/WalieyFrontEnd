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

import { Categories } from "../../features/Category/category_index";
import { SuperAdminDeleteCategory } from "../../features/SuperAdmin";

const useStyles = makeStyles({
  table: {
    minWidth: 280,
    boxShadow: "0px 0px 20px #00000026",
    marginTop: 10,
    borderRadius: 12,
  },
});

export default function AdminCategoryList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(Categories());
  }, [dispatch]);

  const handleDelete = (e) => {
    dispatch(SuperAdminDeleteCategory(e));
    dispatch(Categories());
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
        Category List
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>name</TableCell>

            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.loading === false && rows.categories && rows.categories.length
            ? rows.categories.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.categoryImage ? (
                      <img
                        width="50"
                        height="50"
                        src={row.categoryImage}
                        alt="Nothing"
                      />
                    ) : null}
                  </TableCell>

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

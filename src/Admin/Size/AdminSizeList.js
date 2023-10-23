import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Typography } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getSize } from "../../features/Utils/index_size";

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
            <TableCell align="center">name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.loading === false && rows.sizes && rows.sizes.length
            ? rows.sizes.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Container>
  );
}

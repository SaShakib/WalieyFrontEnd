import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getColor } from "../../features/Utils/index_color";

const useStyles = makeStyles({
  table: {
    minWidth: 360,
    boxShadow: "0px 0px 20px #00000026",
    marginTop: 10,
    borderRadius: 12,
  },
  circle: {
    width: 35,
    height: 35,
    boxShadow: "0px 0px 20px #00000026",
    borderRadius: `50%`,
  },
});

export default function AdminColorList() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.color);

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.table}>
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
            <TableCell>name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>hex</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.loading === false && rows.colors && rows.colors.length
            ? rows.colors.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <div
                      className={classes.circle}
                      style={{ background: row.hex }}
                    ></div>
                  </TableCell>

                  <TableCell>{row.hex}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Paper>
  );
}

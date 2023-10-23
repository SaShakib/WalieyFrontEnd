import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  Button: {
    // padding: 0,
    fontStyle: "italic",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: "16px",
    fontFamily: "sans",
    marginRight: 12,
    marginLeft: 12,
    background: "none",
    borderRadius: "12px",
    "&:hover": {
      background: "none",
    },
  },
  Paper: {
    background: theme.palette.secondary.main,
    height: "auto",
    marginTop: theme.spacing(3),

    marginBottom: theme.spacing(3),
  },
  Typography: {
    fontStyle: "italic",
    color: "#fff",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(5),
  },
  category: {
    display: "flex",
    flexWrap: "wrap",
    paddingBottom: theme.spacing(2),
    justifyContent: "center",
  },
  topCategory: {
    color: "#fff",
    fontStyle: "italic",
  },
}));
function Banner({ category, name }) {
  const style = useStyle();

  return (
    <div>
      <Paper className={style.Paper}>
        <Typography variant="h3" align="center" className={style.Typography}>
          {name}
        </Typography>

        <Typography variant="h5" align="center" className={style.topCategory}>
          Top Category
        </Typography>
        <div className={style.category}>
          {category && category.length
            ? category.map((category, key) => (
                <Button
                  key={key}
                  className={style.Button}
                  component={Link}
                  to={`/Category/${category._id}`}
                >
                  {category.name}
                </Button>
              ))
            : null}
        </div>
      </Paper>
    </div>
  );
}

export default Banner;

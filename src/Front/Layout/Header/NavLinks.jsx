import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    transform: "translate(2px, -1px)",
  },
  Navlink: {
    display: "flex",
    marginBottom: theme.spacing(1),
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

function NavLinks() {
  const classes = useStyles();
  
  return (
    <div className={classes.Navlink}>
      <Button
        color="inherit"
        className={classes.button}
        component={Link}
        to="/"
      >
        <HomeOutlinedIcon className={classes.icon} />
        HOME
      </Button>
      <Button
        color="inherit"
        className={classes.button}
        component={Link}
        to="/Locations"
      >
        <LocationOnOutlinedIcon className={classes.icon} />
        LOCATION
      </Button>
      <Button
        color="inherit"
        className={classes.button}
        component={Link}
        to="/shops"
      >
        <StorefrontOutlinedIcon className={classes.icon} />
        SHOPS
      </Button>
      <Button
        color="inherit"
        className={classes.button}
        component={Link}
        to="/Products"
      >
        <LocalMallOutlinedIcon className={classes.icon} />
        PRODUCTS
      </Button>
    </div>
  );
}

export default NavLinks;

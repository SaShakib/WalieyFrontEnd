import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  Vanish: {
    display: "none",
    bottom: 0,
    zIndex: 1000,
    position: "fixed",
    left: 0,
    right: 0,
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

function FrontBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const classes = useStyle();
  return (
    <div>
      <div className={classes.Vanish}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            component={Link}
            to="/"
            icon={<HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Location"
            component={Link}
            to="/Locations"
            icon={<LocationOnOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Shops"
            component={Link}
            to="/shops"
            icon={<StorefrontOutlinedIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/Products"
            label="Products"
            icon={<LocalMallOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Cart"
            component={Link}
            to="/Cart"
            icon={<ShoppingCartOutlinedIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default FrontBottomNavigation;

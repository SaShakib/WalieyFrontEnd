import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  Vanish: {
    display: "none",
    bottom: 0,
    position: "fixed",

    left: 0,
    right: 0,
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

function BottomNavigationIndex() {
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
          color="secondary"
        >
          <BottomNavigationAction
            component={Link}
            to="/admin"
            label="Products"
            icon={<LocalMallOutlinedIcon color="secondary" />}
          />

          <BottomNavigationAction
            label="Orders"
            component={Link}
            to="/admin/orders"
            icon={<ListAltIcon color="secondary" />}
          />

          <BottomNavigationAction
            label="Category"
            component={Link}
            to="/admin/Category"
            icon={<CategoryIcon color="secondary" />}
          />

          <BottomNavigationAction
            label="Add"
            component={Link}
            to="/admin/CreateProducts"
            icon={<AddShoppingCartIcon color="secondary" />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default BottomNavigationIndex;

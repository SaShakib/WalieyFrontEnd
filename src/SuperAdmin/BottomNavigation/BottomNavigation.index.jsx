import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import CategoryIcon from "@material-ui/icons/Category";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";

import TuneIcon from "@material-ui/icons/Tune";
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
        >
          <BottomNavigationAction
            component={Link}
            to="/SuperAdmin/WalieyAdmin"
            label="Products"
            icon={<LocalMallOutlinedIcon color="secondary" />}
          />

          <BottomNavigationAction
            label="Orders"
            component={Link}
            to="/SuperAdmin/WalieyAdmin/orders"
            icon={<BorderColorIcon color="secondary" />}
          />
          <BottomNavigationAction
            label="Slider"
            component={Link}
            to="/SuperAdmin/WalieyAdmin/Slider"
            icon={<TuneIcon color="secondary" />}
          />
          <BottomNavigationAction
            label="Category"
            component={Link}
            to="/SuperAdmin/WalieyAdmin/Category"
            icon={<CategoryIcon color="secondary" />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default BottomNavigationIndex;

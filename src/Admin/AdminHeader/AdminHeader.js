import React, { useState } from "react";
import {
  AppBar,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Toolbar,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ExpandLess from "@material-ui/icons/ExpandLess";
import CategoryIcon from "@material-ui/icons/Category";
import PaletteIcon from "@material-ui/icons/Palette";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import axiosIntance from "../../app/helpers/axios";
import LogoComp from "../../Front/Layout/Header/LogoComp";

const useStyles = makeStyles((theme) => ({
  List: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    width: 250,
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  Paper_root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // borderRadius: `25px`,

    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
function AdminHeader() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ColOpen, setColOpen] = React.useState(false);
  const history = useHistory();
  const handleClick = () => {
    setColOpen(!ColOpen);
  };
  const handleSignOut = async () => {
    localStorage.clear();
    axiosIntance.post("admin/signout");

    history.push("/admin/Login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        className={classes.Drawer}
      >
        <div className={classes.list} role="presentation">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.List}
          >
            <LogoComp />
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <StorefrontIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {ColOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={ColOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/admin/"
                >
                  <ListItemIcon>
                    <ShoppingBasketIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="All Products" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/admin/CreateProducts"
                >
                  <ListItemIcon>
                    <AddShoppingCartIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button component={Link} to="/admin/orders">
              <ListItemIcon>
                <BorderColorIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>

            <ListItem button component={Link} to="/admin/Category">
              <ListItemIcon>
                <CategoryIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>

            <ListItem button component={Link} to="/admin/Color">
              <ListItemIcon>
                <PaletteIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Color" />
            </ListItem>
            <ListItem button component={Link} to="/admin/Size">
              <ListItemIcon>
                <FormatSizeIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Size" />
            </ListItem>
            <ListItem button component={Link} to="/admin/Location">
              <ListItemIcon component={Link} to="/admin/Location">
                <LocationOnIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Location" />
            </ListItem>

            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="SignOut" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default AdminHeader;

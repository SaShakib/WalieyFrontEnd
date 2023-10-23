import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Paper,
  Toolbar,
  ListItemText,
  TextField,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MenuIcon from "@material-ui/icons/Menu";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";

import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMore from "@material-ui/icons/ExpandMore";

import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LogoComp from "./LogoComp";
import { useEffect } from "react";
import axiosIntance from "../../../app/helpers/axios";

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
  paperContent: {
    // margin: `12px 0px`,
    display: "flex",
    alignItems: "center",
    padding: "2 px 3px",
    width: "80%",
    boxShadow: "0px 0px 15px #00000026",
    borderRadius: 25,

    flexGrow: 1,
  },
  Paper_root: {
    display: "flex",
    alignItems: "center",
    borderRadius: `25px`,
    boxShadow: "0px 0px 15px #00000026",
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(2),
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
function HeaderNavigation() {
  const Cart = useSelector((state) => state.Cart);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ColOpen, setColOpen] = React.useState(false);
  const categories = useSelector((state) => state.categories);
  const [Allcategory, setAllcategory] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleClick = () => {
    setColOpen(!ColOpen);
  };

  useEffect(() => {
    axiosIntance
      .get("/category/all")
      .then((res) => setAllcategory(res.data.categories));
  }, []);

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
          <Paper className={classes.paperContent} elevation={0}>
            {Allcategory && Allcategory.length ? (
              <Autocomplete
                id="CategoryComp"
                onChange={(value, newValue) => setSearch(newValue.slug)}
                fullWidth
                options={Allcategory}
                disableClearable
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.input}
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      endAdornment: <></>,
                    }}
                    placeholder="Search On Waliey"
                    fullWidth
                  
                    variant="standard"
                  />
                )}
              />
            ) : null}

            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={() => history.push(`/Category/child/${search}`)}
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          <Button
            className={classes.title}
            component={Link}
            to="/admin/Login"
            color="inherit"
          >
            Login
          </Button>

          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            component={Link}
            to="/Cart"
          >
            <Badge badgeContent={Cart.cartCount} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
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
                <CategoryIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {ColOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={ColOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories.categories && categories.categories.length
                  ? categories.categories.map((category, key) => (
                      <ListItem
                        key={key}
                        button
                        className={classes.nested}
                        component={Link}
                        to={`/Category/${category._id}`}
                      >
                        <ListItemText primary={category.name} />
                      </ListItem>
                    ))
                  : null}
              </List>
            </Collapse>
            <ListItem button component={Link} to="/Locations">
              <ListItemIcon>
                <LocationOnOutlinedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Location" />
            </ListItem>

            <ListItem button component={Link} to="/shops">
              <ListItemIcon>
                <StorefrontOutlinedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Shops" />
            </ListItem>
            <ListItem button component={Link} to="/Products">
              <ListItemIcon>
                <LocalMallOutlinedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/admin/SignUp">
              <ListItemIcon>
                <GroupAddIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="SignUp" />
            </ListItem>
            <ListItem button component={Link} to="/admin">
              <ListItemIcon>
                <SupervisorAccountIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default HeaderNavigation;

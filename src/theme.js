import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4fce2fcf",
      light: "#fffff",
      dark: "#303030",
    },
    secondary: {
      main: "#292D36",
    },
  },
});

theme.props = {
  MuiAppBar: {
    // color: theme.palette.primary.light
  },
  MuiToolbar: {},
};

theme.overrides = {
  MuiBottomNavigationAction: {
    root: {
      minWidth: "none",
    },
  },
  MuiCardContent: {
    root: {
      padding: 0,
    },
  },
  MuiCardActions: {
    root: {
      padding: 0,
    },
  },
};
export default theme;

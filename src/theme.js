import { createTheme } from "@mui/material";
import "@fontsource/roboto/400.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1D94CE",
      light: "#175f5d",
      contrastText: "#ffff",
    },
    secondary: {
      main: "#D3DADD",
      light: "#456a70",
      dark: "#f63c3c",
      contrastText: "#728691",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 16,
    },
  },
});

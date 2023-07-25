import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark", // Set the theme to dark
    primary: {
      main: "#90caf9", // Set your primary color
    },
    secondary: {
      main: "#f48fb1", // Set your secondary color
    },
    background: {
      default: "#121212", // Set your background color
    },
    text: {
      primary: "#fff", // Set your primary text color to white
      secondary: "#bdbdbd", // Set your secondary text color
    },
  },
});

export default theme;

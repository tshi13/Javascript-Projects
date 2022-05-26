import { ThemeProvider } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import App from "./App";
import createTheme from "@material-ui/core/styles/createTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import { BrowserRouter as Router } from "react-router-dom";

const theme = responsiveFontSizes(createTheme());

ReactDOM.render(
  <Router>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);

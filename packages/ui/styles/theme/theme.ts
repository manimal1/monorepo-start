import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";
import { layout } from "./layout";

export const getMuiTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        ...colors.primary,
      },
      secondary: {
        ...colors.secondary,
      },
      background: {
        default: mode === "light" ? colors.bg.light : colors.bg.dark,
        paper: mode === "light" ? colors.bg.light : colors.bg.dark,
      },
      text: {
        primary: mode === "light" ? colors.text.light : colors.text.dark,
        // secondary:
        //   mode === "light"
        //     ? colors.text.lightSecondary
        //     : colors.text.darkSecondary,
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", sans-serif, Roboto',
      fontSize: 16,
      h1: { fontSize: "2rem" },
      h2: { fontSize: "1.75rem" },
      body1: { fontSize: "0.875rem" },
      button: {
        textTransform: "none", // remove uppercase
        fontSize: "0.875rem",
        fontWeight: 600, // Optional: Make it bold
      },
    },
    zIndex: {
      drawer: layout.zIndexes.drawer,
      appBar: layout.zIndexes.appBar,
      modal: layout.zIndexes.modal,
      snackbar: layout.zIndexes.snackbar,
      tooltip: layout.zIndexes.tooltip,
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: mode === "light" ? colors.text.light : colors.text.dark,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          startIcon: {
            color: colors.buttonIcons,
            "& svg": {
              color: colors.buttonIcons,
            },
          },
          endIcon: {
            color: colors.buttonIcons,
            "& svg": {
              color: colors.buttonIcons,
            },
          },
        },
      },
    },
  });

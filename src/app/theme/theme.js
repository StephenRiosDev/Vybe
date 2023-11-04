import { Theme, createTheme, ThemeOptions } from "@mui/material";
import { InputProps } from "@mui/material/Input";

const VARS = {
  // Colors
  bgUnfocused: "rgba(255,255,255,.75)",
  bgFocused: "rgba(255,255,255,1)",
  borderUnfocused: "2px solid transparent",
  borderFocused: `2px solid ${VybeTheme.palette.primary[100]}`
}

export const VybeTheme = createTheme({

  shape: {
    borderRadius: 35
  },

  spacing: (factor) => `${0.25 * factor}rem`,

  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
    body1: {
      letterSpacing: "-0.84px"
    }
  },

  components: {

    MuiInputBase: {
      styleOverrides: {
        root: ({theme}) => ({
          '.MuiInputBase-input': {
            padding: theme.spacing(3)
          },
          '&[class*="-colorPrimary"]': {
            color: theme.palette.primary.main,
            backgroundColor: VARS.bgUnfocused,
            borderRadius: theme.shape.borderRadius / 2,
            border: VARS.borderUnfocused,
            outline: "none",
            padding: "0",
            fontSize: "1rem",
            '&.Mui-focused': {
              backgroundColor: VARS.bgFocused,
              border: VARS.borderFocused
            },
            '& fieldset': {
              border: "none",
              outline: "none"
            }
          }
        })
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: "static",
          fontSize: "0.875",
          transform: "none",
          color: "#FFF",
          fontWeight: "100",
          '&.Mui-focused': {
            color: "#FFF"
          }
        },
      },
    }
  },

  palette: {
    primary: {
      main: '#46756C',
      50: '#e3e5e5',
      100: '#b8bebd',
      200: '#899392',
      300: '#596866',
      400: '#364745',
      500: '#122724',
      600: '#102320',
      700: '#0d1d1b',
      800: '#0a1716',
      900: '#050e0d',
      A100: '#52ffff',
      A200: '#1fffff',
      A400: '#00ebeb',
      A700: '#00d1d1'
    },
    secondary: {
        50: '#e0fff2',
        100: '#b3ffdf',
        200: '#80ffca',
        300: '#4dffb4',
        400: '#26ffa4',
        500: '#00ff94',
        600: '#00ff8c',
        700: '#00ff81',
        800: '#00ff77',
        900: '#00ff65',
        A100: '#ffffff',
        A200: '#f2fff7',
        A400: '#bfffd5',
        A700: '#a6ffc3'
    },
    info: {
        50: '#fff3e0',
        100: '#ffe0b3',
        200: '#ffcc80',
        300: '#ffb84d',
        400: '#ffa826',
        500: '#ff9900',
        600: '#ff9100',
        700: '#ff8600',
        800: '#ff7c00',
        900: '#ff6b00',
        A100: '#ffffff',
        A200: '#fff7f2',
        A400: '#ffd6bf',
        A700: '#ffc6a6'
    },
    warning: {
        50: '#fffee0',
        100: '#fffcb3',
        200: '#fffa80',
        300: '#fff84d',
        400: '#fff726',
        500: '#fff500',
        600: '#fff400',
        700: '#fff200',
        800: '#fff000',
        900: '#ffee00',
        A100: '#ffffff',
        A200: '#fffef2',
        A400: '#fffabf',
        A700: '#fff8a6'
    },
    error: {
        50: '#ffe6e0',
        100: '#ffc0b3',
        200: '#ff9780',
        300: '#ff6d4d',
        400: '#ff4d26',
        500: '#ff2e00',
        600: '#ff2900',
        700: '#ff2300',
        800: '#ff1d00',
        900: '#ff1200',
        A100: '#ffffff',
        A200: '#fff3f2',
        A400: '#ffc1bf',
        A700: '#ffa9a6'
    },
    success: {
        50: '#e0f8ff',
        100: '#b3edff',
        200: '#80e1ff',
        300: '#4dd4ff',
        400: '#26cbff',
        500: '#00c2ff',
        600: '#00bcff',
        700: '#00b4ff',
        800: '#00acff',
        900: '#009fff',
        A100: '#ffffff',
        A200: '#f2faff',
        A400: '#bfe4ff',
        A700: '#a6d9ff'
    }
  }
})
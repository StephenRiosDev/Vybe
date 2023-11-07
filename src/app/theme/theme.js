import { createTheme } from "@mui/material";

export const VybeTheme = createTheme({

  shape: {
    borderRadius: '2.188rem'
  },

  spacing: (factor) => `${0.25 * factor}rem`,

  typography: ({theme}) => ({
    fontFamily: ["Quicksand", "sans-serif"].join(","),
    body1: {
      letterSpacing: "-0.84px"
    },
    h2: {
      fontFamily: '"Baloo 2", sans-serif',
      fontWeight: "800",
      fontSize: "2rem",
      lineHeight: 1,
      margin: 0,
      padding: 0
    }
  }),

  components: {

    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: "100%"
        })
      }
    },

    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          '.MuiInputBase-input': {
            padding: theme.spacing(3)
          },
          '&[class*="-colorPrimary"]': {
            color: theme.palette.primary.main,
            backgroundColor: VARS.bgUnfocused,
            borderRadius: `calc(${theme.shape.borderRadius} / 2)`,
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
          },
          '.MuiInputBase-input': {
            padding: theme.spacing(2)
          },
          '&.Mui-focused': {
            '.MuiInputAdornment-root': {
              color: theme.palette.primary.main
            }
          },
          '&.Mui-error': {
              border: `0.125rem solid ${theme.palette.warning[100]}`,
          }
        })
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          position: "static",
          fontSize: "0.875",
          transform: "none",
          color: "#FFF",
          fontWeight: "100",
          '&.Mui-focused': {
            color: "#FFF"
          },
          '&.Mui-error': {
            color: theme.palette.warning[100]
          }
        }),
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "#FFF",
          marginRight: "0.5rem",
          cursor: "pointer",
          'svg': {
            maxHeight: "1.25rem"
          }
        })
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      },
      variants: [
        {
          props: { variant: "vybe" },
          style: ({ theme }) => ({
            backgroundColor: "transparent",
            color: "#FFF",
            border: "none",
            outline: "none",
            fontSize: "0.875rem",
            position: "relative",
            borderRadius: "0",
            padding: theme.spacing(3),
            lineHeight: "1",
            transition: "all 0.25s ease",
            '&:after': {
              content: '""',
              position: "absolute",
              top: "100%",
              width: `calc(100% - ${theme.spacing(6)})`,
              height: "2px",
              backgroundColor: "#fff",
              transition: "all 0.25s ease"
            },
            '&:hover': {
              '&: after': {
                width: `calc(100% - ${theme.spacing(3)})`
              }
            }
          })
        },
        {
          props: { variant: "vybe-right" },
          style: ({ theme }) => ({
            ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe").style({theme: theme}),
            '&:before': {
              content: '""',
              position: "absolute",
              top: "calc(100% - 0.15rem)",
              left: `calc(100% - ${theme.spacing(3)})`,
              width: "0px",
              height: "0px",
              borderStyle: "solid",
              borderWidth: "3.5px 0 3.5px 7px",
              borderColor: `transparent transparent transparent ${theme.palette.primary.light}`,
              transition: "all 0.25s ease"
            },
            '&:after': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe").style({theme: theme})['&:after'],
              left: theme.spacing(3)
            },
            '&:hover': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe").style({theme: theme})['&:hover'],
              '&:before': {
                left: `100%`
              },
              '&:after': {
                ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe").style({theme: theme})['&:hover']['&:after'],
              }
            }
          })
        },
        {
          props: { variant: "vybe-left" },
          style: ({theme}) => ({
            ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style({theme: theme}),
            '&:before': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style({theme: theme})['&:before'],
              borderWidth: "3.5px 7px 3.5px 0",
              borderColor: `transparent ${theme.palette.primary.light} transparent transparent`,
              left: theme.spacing(1.5)
            },
            '&:after': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style({theme: theme})['&:after'],
              left: "auto",
              right: theme.spacing(3)
            },
            '&:hover': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style({theme: theme})['&:hover'],
              '&:before': {
                left: `-${theme.spacing(1.5)}`
              }
            }
          })
        },
        {
          props: { color: "primary" },
          style: ({ theme }) => ({
            ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe").style,
            '&:hover': {
              color: theme.palette.primary.light
            },
            '&:after': {
              backgroundColor: theme.palette.primary.light
            }
          })
        },
        {
          props: { color: "secondary" },
          style: ({ theme }) => ({
            ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe").style,
            color: theme.palette.secondary[500],
            '&:after': {
              backgroundColor: theme.palette.secondary[500]
            },
            '&:hover': {
              color: theme.palette.secondary[200],
              '&:after': {
                backgroundColor: theme.palette.secondary[200]
              }
            },
          })
        },
        {
          props: { variant: "vybe-left", color: "secondary" },
          style: ({ theme }) => ({
            ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-left").style,
            '&:before': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-left").style['&:before'],
              borderColor: `transparent ${theme.palette.secondary[500]} transparent transparent`,
            },
            '&:hover': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-left").style['&:hover'],
              '&:before': {
                borderColor: `transparent ${theme.palette.secondary[200]} transparent transparent`,
              }
            }
          })
        },
        {
          props: { variant: "vybe-right", color: "secondary" },
          style: ({ theme }) => ({
            ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style,
            '&:before': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style['&:before'],
              borderColor: `transparent transparent transparent ${theme.palette.secondary[500]} `,
            },
            '&:hover': {
              ...theme.components.MuiButton.variants.find(({ props }) => props.variant === "vybe-right").style['&:hover'],
              '&:before': {
                borderColor: `transparent transparent transparent ${theme.palette.secondary[200]}`,
              }
            }
          })
        }
      ]
    },

    MuiTypography: {
      styleOverrides: {
        body1: ({theme}) => ({
          color: theme.palette.primary.light
        }),
        h2: ({theme}) =>  ({
          color: theme.palette.primary.light
        })
      }
    }
  },

  palette: {
    primary: {
      main: '#46756C',
      light: '#ABEDE1',
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

const VARS = {
  // Colors
  bgUnfocused: "rgba(255,255,255,.65)",
  bgFocused: "rgba(255,255,255,1)",
  borderUnfocused: "0.125rem solid transparent",
  borderFocused: `0.125rem solid ${VybeTheme.palette.primary[100]}`
}
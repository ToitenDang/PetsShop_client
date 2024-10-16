import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { teal, deepOrange, cyan, orange } from '@mui/material/colors'
// import { BorderColor } from '@mui/icons-material'

// Create a theme instance.
const theme = extendTheme({
    myApp: {
        mainColor: '#ed6b40'
    },
    customSize: {
        headerHeight: '74px',
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: teal,
        //         secondary: deepOrange
        //     }
        // },

        // dark: {
        //     palette: {
        //         primary: cyan,
        //         secondary: orange
        //     }
        // }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdc3c7',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb: hover': {
                        backgroundColor: 'white'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontSize: '16px'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => (
                    {
                        // color: theme.palette.primary.main,
                        fontSize: '0.875rem',
                        // '.MuiOutlinedInput-notchedOutline': {
                        //     borderColor: theme.palette.primary.light
                        // },
                        // '&:hover': {
                        //   '.MuiOutlinedInput-notchedOutline': {
                        //     borderColor: theme.palette.primary.main
                        //   }
                        // },
                        '& fieldset': { borderWidth: '0.5px !important' },
                        '&:hover fieldset': { borderWidth: '1px !important' },
                        '&.Mui-focused fieldset': { borderWidth: '1px !important' }
                    }
                )
            }
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdc3c7',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#666565',

                    }
                }
            }
        },
    },
    // breakpoints: {
    //     values: {
    //         xs: 0,
    //         ms: 684,
    //         sm: 800,
    //         md: 1000,
    //         lg: 1137,
    //         ml:1169,
    //         xl: 1536,
    //     },
    // },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          cus_hg_sm: 650,
          cus_up_md: 850,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
})

export default theme
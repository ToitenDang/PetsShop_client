import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#000',
                }
            }
        },

        dark: {
            palette: {
                secondary: {
                    main: '#000',
                }
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
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1137,
            xl: 1536,
        },
    },
})

export default theme
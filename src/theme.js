import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#ff5252',
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
    }
})

export default theme
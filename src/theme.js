import { createTheme } from '@mui/material/styles'
import { red, grey } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode:'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
        secondary: grey[500]
    }
  }
})

export default theme
import Box from '@mui/material/Box'

function Contact() {
  return (
    <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.customSize.headerHeight})`,
    }}>
        Contact page
    </Box>
  )
}

export default Contact

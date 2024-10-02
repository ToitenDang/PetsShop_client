import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Header from './components/Header/Header'
import Content from './pages/Content/Content'

function App() {

  return (
    <Container disableGutters maxWidth = {false} sx={{ height: '100vh', backgroundColor: 'primary.main'}}>
      <Box >
        <Header/>
      </Box>
      <Box>
        <Content/>
      </Box>
    </Container>
  )
}

export default App

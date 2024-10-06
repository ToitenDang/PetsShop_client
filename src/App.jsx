import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
// import Header from './components/Header/Header'
import { publicRoutes } from './routes/route'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'


function App() {

  return (
    <Router>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
        {/* <Box >
          <Header/>
        </Box>
        <Box>
          <Home/>
        </Box> */}
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            
            if(route.layout){
              Layout = route.Layout
            } else if(route.layout === null){
              Layout = Fragment
            }
            return (
              <Route key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </Container>
    </Router>
  )
}

export default App

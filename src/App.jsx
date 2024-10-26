
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
// import Header from './components/Header/Header'
import { publicRoutes } from './routes/route'
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout'
import Home from './pages/Home/Home'


function App() {

  return (
    
    <Home />
  )
}

export default App

import { useState } from 'react'
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors'
import ModeSelect from './components/ModeSelect/ModeSelect'
import Appbar from './components/Appbar/Appbar'
import Login from './pages/Login'
import Home from './pages/Home/Home'
function App() {
  return (
    <>
      {/* <Appbar/> */}
      <Home />
    </>
  )
}

export default App

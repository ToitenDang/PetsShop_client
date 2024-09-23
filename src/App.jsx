import { useState } from 'react'
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors'
import ModeSelect from './components/ModeSelect/ModeSelect'
import Appbar from './components/Appbar/Appbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Appbar/>
    </>
  )
}

export default App

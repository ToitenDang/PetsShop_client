import { useState } from 'react'
import Button from '@mui/material/Button'
import { red } from '@mui/material/colors'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>Dang Dep Trai</div>
      <Button variant='outlined'>Outline</Button>
    </>
  )
}

export default App

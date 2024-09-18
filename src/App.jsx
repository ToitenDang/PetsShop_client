import { useState } from 'react'
import Button from '@mui/material/Button'

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

import React from 'react';
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      hi
      <button onClick={()=> navigate("/login")}>Login</button>
      <button onClick={()=> navigate("/register")}>Register</button>
      <button onClick={()=> navigate("/problems")}>Problems</button>
    </>
  )
}

export default App

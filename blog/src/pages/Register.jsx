import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom";
function Register() {
  const { register } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    register(email, password)
  }
  return (

    <form onSubmit={handleSubmit} >
      <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
      <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} />
      <button>Register</button>
      <Link to='/login'>Login</Link>
    </form>

  )
}

export default Register
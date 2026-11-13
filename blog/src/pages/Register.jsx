import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    
    register(email, password)
    navigate('/')
  }
  return (

    <form onSubmit={handleSubmit} >
      <h1>Register</h1>
      <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder='Password' />
      <button>Register</button>
      <Link to='/login'>Login</Link>
    </form>

  )
}

export default Register
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const validatePassword = (password) => {
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return ""
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    try {

      await register(email, password)
      navigate('/login')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already registered')
      }else{
        setError('Registration failed. Please try again.')
      }
    }
  }
  return (

    <form onSubmit={handleSubmit} >
      <h1>Register</h1>
      <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder='Password' />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button>Register</button>
      <Link to='/login'>Login</Link>
    </form>

  )
}

export default Register
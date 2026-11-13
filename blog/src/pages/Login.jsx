import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/')
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setError('Invalid email or password. Please try again.')
            } else {
                setError('Login failed. Please try again.')
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} >
            <h1>Login</h1>
            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' type="email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type="password" />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button>Login</button>
            <Link to='/register'>Register</Link>
        </form>
    )
}

export default Login
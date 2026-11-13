import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password).then((data) => {
            return navigate('/')
        })
    }
    return (
        <form onSubmit={handleSubmit} >
            <h1>Login</h1>
            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' type="email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type="password" />
            <button>Login</button>
            <Link to='/register'>Register</Link>
        </form>
    )
}

export default Login
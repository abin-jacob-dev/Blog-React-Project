import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (
        <form onSubmit={handleSubmit} >
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
            <button>Login</button>
            <Link to='/register'>Register</Link>
        </form>
    )
}

export default Login
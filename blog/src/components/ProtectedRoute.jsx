import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import React from 'react'

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return <p>Loading...</p>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <Outlet />
    )
}

export default ProtectedRoute
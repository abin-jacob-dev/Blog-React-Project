import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import BlogList from './pages/BlogList';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import BlogForm from './pages/BlogForm';
import { useAuth } from './context/AuthContext';
import PageNotFound from './pages/PageNotFound';


function App() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' replace />} />
      <Route path='/register' element={!user ? <Register /> : <Navigate to='/' replace />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<BlogList />} />
        <Route path='/add' element={<BlogForm />} />
        <Route path='/edit/:blogId' element={<BlogForm />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App

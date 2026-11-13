import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import BlogList from './pages/BlogList';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import BlogForm from './pages/BlogForm';



function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<BlogList />} />
        <Route path='/add' element={<BlogForm />} />
        <Route path='/edit/:blogId' element={<BlogForm />} />
      </Route>
    </Routes>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import './BlogList.css';




function BlogList() {
    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async () => {
        const q = query(collection(db, 'blogs'), where('userId', "==", user.uid))
        const snapshot = await getDocs(q)
        const blogs = (snapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data()
            }
        )))
        setBlogs(blogs)
    }
    useEffect(() => {
        fetchBlogs()
    }, [user.uid])

    const handleDelete = async (blogId) => {
        await deleteDoc(doc(db, 'blogs', blogId))
        setBlogs(prevBlogs => prevBlogs.filter((blog) => blog.id !== blogId))

    }
    const handleEdit = async (blogId) => {
        // await updateDoc(doc(db, 'blogs', blogId))
        navigate(`/edit/${blogId}`)
    }
    return (
        <>
            <div className="blog-header">
                <Link to="/add">Add Blog</Link>
                <button onClick={logout}>Logout</button>
            </div>
            <h2 className="blog-heading">My Blogs</h2>
            <div className="blog-list">
                {blogs.map(blog => (
                    <div className="blog-card" key={blog.id}>
                        <p className="blog-id">{blog.id}</p>
                        <h4 className="blog-title">{blog.title}</h4>
                        <p className="blog-content">{blog.content}</p>
                        <div className="blog-actions">
                            <button onClick={() => handleDelete(blog.id)}>Delete</button>
                            <button onClick={() => handleEdit(blog.id)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BlogList

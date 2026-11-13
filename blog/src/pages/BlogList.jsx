import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';




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
            <Link to="/add" >Add Blog</Link>
            <button onClick={logout}>Logout</button>
            <div>My Blogs </div>

            <div>
                {blogs.map(blog => (
                    <div key={blog.id}>
                        <p>{blog.id}</p>
                        <h4>{blog.title}</h4>
                        <p>{blog.content}</p>
                        <button onClick={() => handleDelete(blog.id)}>Delete</button>
                        <button onClick={() => handleEdit(blog.id)}>Edit</button>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    )
}

export default BlogList

import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

function BlogForm() {
    const { user } = useAuth()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addDoc(collection(db, "blogs"), {
            title: title,
            content: content,
            userId: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
        setTitle("")
        setContent("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Blog Title' type="text" />
            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Blog Content' ></textarea>
            <button>Publish Blog</button>
            <Link to="/">My Blogs</Link>
        </form>
    )
}

export default BlogForm
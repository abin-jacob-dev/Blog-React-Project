import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useParams } from "react-router-dom";

function BlogForm() {
    const { user } = useAuth()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { blogId } = useParams()
    console.log(blogId);
    const navigate = useNavigate()

    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                const snapshot = await getDoc(doc(db, "blogs", blogId))
                console.log(snapshot.data());
                setTitle(snapshot.data().title)
                setContent(snapshot.data().content)
            }
            fetchBlog()
        }

    }, [blogId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!blogId) {
            await addDoc(collection(db, "blogs"), {
                title: title,
                content: content,
                userId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            setTitle("")
            setContent("")

        } else {

            await updateDoc(doc(db, 'blogs', blogId), {
                title: title,
                content: content,

                updatedAt: serverTimestamp()
            })


        }
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Blog Title' type="text" />
            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Blog Content' ></textarea>
            <button>{blogId ? "Update Blog" : "Publish Blog"}</button>
            <Link to="/">My Blogs</Link>
        </form>
    )
}

export default BlogForm
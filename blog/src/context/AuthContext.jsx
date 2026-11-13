import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    async function register(email, password) {
        await createUserWithEmailAndPassword(auth, email, password)

    }
    async function login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
    }
    async function logout() {
        await signOut(auth)
    }
    useEffect(() => {


        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)

        })
        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, loading, register, login,logout }}>
            {children}
        </AuthContext.Provider >
    )
}
export {
    AuthProvider,
    useAuth
}

export default AuthContext
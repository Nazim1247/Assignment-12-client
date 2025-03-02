import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const updateUser = (name, photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {displayName: name, photoURL: photo})
    }

    const logoutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const toggleTheme = ()=>{
        setTheme((prevTheme)=>(prevTheme === 'light'? 'dark': 'light'))
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            
            if(theme === 'dark'){
                document.documentElement.classList.add('dark')
            }else{
                document.documentElement.classList.remove('dark')
            }
            localStorage.setItem('theme', theme)

            if(currentUser){
                // get token and store client 
                const userInfo = {email: currentUser?.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            }else{
                // remove token
                localStorage.removeItem('access-token');
            }
            // if(currentUser?.email){
            //     // save user info in db
            //     await axiosSecure.post(`users/${currentUser?.email}`,
            //         {
            //             name: currentUser?.displayName, image: currentUser?.photoURL,
            //             email: currentUser?.email,
            //         })
            // }

            setLoading(false)
        })
        return ()=>{
            unSubscribe();
        }
    },[theme])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        googleLogin,
        updateUser,
        logoutUser,
        theme,
        toggleTheme,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
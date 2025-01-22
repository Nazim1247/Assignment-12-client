import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            // console.log(currentUser)
            setUser(currentUser)
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
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        googleLogin,
        updateUser,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
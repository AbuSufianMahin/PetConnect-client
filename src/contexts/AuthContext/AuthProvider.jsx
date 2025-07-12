
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const googleLogin = () => {
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        return signOut(auth);
    }


    const authInfo = {
        user,
        isAuthLoading,
        googleLogin,

        logOutUser
    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
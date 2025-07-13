
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
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

    const createUserWithEmail = (email, password) => {
        setIsAuthLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setIsAuthLoading(true);
        return signInWithPopup(auth, provider);
    }

    const signInEmailUser = (email, password) => {
        setIsAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserInfo = (userInfo) => {
        console.log(userInfo);
        if (user) {
            for (let key in userInfo) {
                setUser({ ...user, [key]: userInfo[key] });
            }
            // setUser({ ...user, photoURL: userInfo.photoURL });
            // setUser({ ...user, displayName: userInfo.userName });

        }
        return updateProfile(auth.currentUser, userInfo);

    }

    const logOutUser = () => {
        setIsAuthLoading(true);
        return signOut(auth);
    }


    const authInfo = {
        user,
        isAuthLoading,

        createUserWithEmail,
        googleLogin,

        signInEmailUser,

        updateUserInfo,

        logOutUser
    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
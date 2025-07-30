
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import { useQueryClient } from '@tanstack/react-query';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const queryClient = useQueryClient();
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
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () => {
        setIsAuthLoading(true);
        return signInWithPopup(auth, githubProvider);
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
        queryClient.clear();  
        return signOut(auth);
    }


    const authInfo = {
        user,
        isAuthLoading,

        createUserWithEmail,

        googleLogin,
        githubLogin,
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
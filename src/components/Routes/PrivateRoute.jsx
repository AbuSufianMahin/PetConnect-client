import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router';
import AuthLoading from '../Shared/AuthLoading/AuthLoading';

const PrivateRoute = ({children}) => {
    const { user, isAuthLoading } = useAuth();

    if (isAuthLoading){
        return <AuthLoading></AuthLoading>
    }

    if (!user){
        return <Navigate to="/login"></Navigate>
    }


    return children;
};

export default PrivateRoute;
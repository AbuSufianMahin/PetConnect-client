import React from 'react';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = () => {
    const { user, isAuthLoading } = useAuth();

    if (isAuthLoading){
        return <p>Loading</p>
    }
};

export default PrivateRoute;
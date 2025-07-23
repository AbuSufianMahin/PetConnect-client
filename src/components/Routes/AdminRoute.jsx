import React from 'react';
import useUserRole from '../../hooks/useUserRole';
import RoleLoading from '../Shared/RoleLoading/RoleLoading';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { role, isRoleLoading } = useUserRole();

    if (isRoleLoading) {
        return <RoleLoading></RoleLoading>
    }

    if (role !== "admin"){
        return <Navigate to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;
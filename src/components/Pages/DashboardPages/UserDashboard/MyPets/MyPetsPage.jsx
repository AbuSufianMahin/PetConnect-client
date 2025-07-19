import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import "react-loading-skeleton/dist/skeleton.css";

import { Button } from '../../../../ui/button';
import NoAddedPets from './NoAddedPets';
import PetsLoadingSkeleton from './petsLoadingSkeleton';
import { Badge } from '../../../../ui/badge';


const MyPetsPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myAddedPetsData = [], isLoading } = useQuery({
        queryKey: ["my-added-pets", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-pets?email=${user.email}`);
            return res.data;
        }
    });

    const handleEdit = () => {

    }
    const handleMarkAdopted = () => {

    }
    const handleDelete = () => {

    }

    return (
        <div className='w-11/12 mx-auto py-10'>
            <h1 className="text-2xl font-bold mb-6 text-center">My Added Pets</h1>

            {/* <NoAddedPets></NoAddedPets> */}


        </div>
    );
};

export default MyPetsPage;
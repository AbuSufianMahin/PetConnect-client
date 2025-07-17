import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import "react-loading-skeleton/dist/skeleton.css";

import { Button } from '../../../../ui/button';
import NoAddedPets from './NoAddedPets';
import PetsLoadingSkeleton from './petsLoadingSkeleton';


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

    console.log(myAddedPetsData);
    const handleEdit = () => {

    }
    const handleMarkAdopted = () => {

    }
    const handleDelete = () => {

    }

    return (
        <div className='w-11/12 mx-auto py-10'>
            <h1 className="text-2xl font-bold mb-6 text-center">My Added Pets</h1>
            {
                isLoading ?
                    <PetsLoadingSkeleton></PetsLoadingSkeleton>
                    :
                    <>
                        {
                            myAddedPetsData?.length === 0 ?
                                <NoAddedPets></NoAddedPets>
                                :
                                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                                    {/* Example Pet Card */}
                                    {myAddedPetsData.map((pet) => (
                                        <div key={pet._id} className="rounded-2xl overflow-hidden shadow flex flex-col">
                                            <div>
                                                <img
                                                    src={pet.photoURL}
                                                    alt={pet.petName}
                                                    className="w-full h-72 object-cover"
                                                />
                                            </div>
                                            <div className='px-6 py-6 bg-white rounded-t-[30%] -mt-20 h-full flex flex-col justify-between'>
                                                <div className='text-center space-y-2'>
                                                    <h2 className="text-xl font-semibold">{pet.petName}</h2>
                                                    <p className="text-sm text-gray-500">Category: {pet.petCategory}</p>
                                                    <p className="text-sm text-gray-500">Age: {pet.petAge} years</p>
                                                    <p className="text-sm text-gray-500">Location: {pet.petLocation}</p>
                                                    <p className="text-sm text-gray-700">{pet.shortDescription}</p>
                                                    {/* <p className="text-sm text-gray-700 mb-3 rich-text-content" dangerouslySetInnerHTML={{ __html: pet.longDescription }}></p> */}

                                                    {/* Status */}
                                                    <span
                                                        className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${pet.isAdopted ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                                                            }`}
                                                    >
                                                        {pet.isAdopted ? "Adopted" : "Available"}
                                                    </span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-5 flex justify-between gap-2">
                                                    <Button
                                                        className="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-primary/90"
                                                        onClick={() => handleEdit(pet)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="bg-blue-100 text-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-200"
                                                        onClick={() => handleMarkAdopted(pet)}
                                                        disabled={pet.isAdopted}
                                                    >
                                                        Mark Adopted
                                                    </Button>
                                                    <Button
                                                        className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded hover:bg-red-200"
                                                        onClick={() => handleDelete(pet)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    ))}


                                </div>
                        }
                    </>
            }
        </div>
    );
};

export default MyPetsPage;
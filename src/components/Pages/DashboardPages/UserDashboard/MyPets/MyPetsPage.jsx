import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

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
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 flex flex-col animate-pulse">
                            {/* Pet Image */}
                            <Skeleton height={200} className="mb-4" style={{borderRadius: "16px"}}/>

                            {/* Text Skeletons */}
                            <div className="grid gap-1">
                                <Skeleton height={20} width="50%" /> {/* Pet Name */}
                                <Skeleton height={16} width="20%" /> {/* Category */}
                                <Skeleton height={16} width="40%" /> {/* Age */}
                                <Skeleton height={16} width="40%" /> {/* Location */}
                                <Skeleton height={16} width="100%" count={2} /> {/* Short description */}
                            </div>

                            {/* Status badge */}
                            <Skeleton height={16} width={100} className="my-2 rounded-full" />

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 ">
                                <Skeleton height={28} width="90%" />
                                <Skeleton height={28} width="90%" />
                                <Skeleton height={28} width="90%" />
                            </div>
                        </div>
                        ))}
                    </div>
                    :
                    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {/* Example Pet Card */}
                        {myAddedPetsData.map((pet) => (
                            <div key={pet._id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                                <img
                                    src={pet.photoURL}
                                    alt={pet.petName}
                                    className="w-full h-52 object-cover rounded-xl mb-4"
                                />

                                <h2 className="text-xl font-semibold mb-1">{pet.petName}</h2>
                                <p className="text-sm text-gray-500 mb-1">Category: {pet.petCategory}</p>
                                <p className="text-sm text-gray-500 mb-1">Age: {pet.petAge} years</p>
                                <p className="text-sm text-gray-500 mb-1">Location: {pet.petLocation}</p>
                                <p className="text-sm text-gray-700 mb-3">{pet.shortDescription}</p>
                                {/* <p className="text-sm text-gray-700 mb-3 rich-text-content" dangerouslySetInnerHTML={{ __html: pet.longDescription }}></p> */}

                                {/* Status */}
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full w-fit mb-3 ${pet.isAdopted ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {pet.isAdopted ? "Adopted" : "Available"}
                                </span>

                                {/* Action Buttons */}
                                <div className="mt-auto flex justify-between gap-2">
                                    <button
                                        className="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-primary/90"
                                        onClick={() => handleEdit(pet)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-blue-100 text-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-200"
                                        onClick={() => handleMarkAdopted(pet)}
                                        disabled={pet.isAdopted}
                                    >
                                        Mark Adopted
                                    </button>
                                    <button
                                        className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded hover:bg-red-200"
                                        onClick={() => handleDelete(pet)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
            }
        </div>
    );
};

export default MyPetsPage;
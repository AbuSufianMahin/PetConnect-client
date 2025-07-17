import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { useInView } from "react-intersection-observer";
import { MapPin } from 'lucide-react';
import { NavLink } from 'react-router';
import PetSkeletonCard from './PetSkeletonCard';

const PetListing = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    // console.log(selectedCategory);

    const { data: allPetsData = [], isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["all-pets"],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosPublic(`/pets?page=${pageParam}&limit=6`);
            return res.data;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasMore) {
                return pages.length + 1;
            }
            return undefined;
        },
    });

    const { ref } = useInView({
        threshold: 1,
        onChange: (inView) => {
            if (inView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage(); // ✅ Now it will fetch the next page
                console.log("fetch new");
            }
        },
    });


    // allPetsData.pages.flatMap(page => page.pets).map((pet) => console.log(pet));
    console.log(allPetsData.pages);



    return (
        <div className="w-11/12 lg:w-9/12 mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Available Pets for Adoption</h1>

            {/* 🔍 Search + Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8 justify-between">
                <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:w-1/3"
                />

                <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger className="md:w-1/3 bg-white">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                        <SelectItem value="Rabbit">Rabbit</SelectItem>
                        <SelectItem value="Fish">Fish</SelectItem>
                        {/* Add more as needed */}
                    </SelectContent>
                </Select>
            </div>

            {/* 🐾 Pet Cards */}
            <div className="grid gap-3 lg:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {
                    isLoading ?
                        <>
                            {
                                [...Array(3)].map((_, i) =>
                                    <PetSkeletonCard key={i} />
                                )
                            }
                        </>
                        :
                        allPetsData.pages.flatMap(page => page.pets).map((pet) => (
                            <div key={pet._id} className='flex flex-col justify-between bg-white border-2 shadow-md hover:shadow-xl transition-shadow duration-300  rounded-2xl overflow-hidden'>
                                <div className="relative backdrop-blur-lg  dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 flex flex-col">
                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src={pet.photoURL}
                                            alt={pet.petName}
                                            className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/70 dark:bg-gray-800/70 text-xs font-medium px-3 py-1 rounded-full shadow">
                                            {pet.petCategory}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="py-3 px-2 -mt-15 z-1 bg-white rounded-t-[100%] text-center">
                                        <NavLink>
                                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1 hover:text-primary">
                                                {pet.petName}
                                            </h2>
                                        </NavLink>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <span className="font-bold">Age:</span> {pet.petAge} years
                                            </p>

                                            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300 gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="font-bold tracking-wide" >{pet.petLocation}</span>
                                            </div>
                                            <p className='bordertext-sm line-clamp-1'>
                                                {pet.shortDescription}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='pb-5 px-10 bg-white'>
                                    <div className='flex flex-wrap gap-3'>
                                        <Button className="flex-1 text-xs md:text-sm">View Details</Button>
                                        <Button className="flex-1 text-xs md:text-sm" variant={"outline"}>Request Adoption</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>

            {isFetchingNextPage && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 min-h-[30vh]">
                    {[...Array(3)].map((_, i) => (
                        <PetSkeletonCard key={i} />
                    ))}
                </div>
            )}
            <div ref={ref} className="h-4" />
        </div>
    );
};

export default PetListing;
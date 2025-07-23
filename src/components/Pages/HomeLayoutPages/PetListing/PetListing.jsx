import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { useInView } from "react-intersection-observer";

import PetSkeletonCard from './PetSkeletonCard';
import useDebounce from '../../../../hooks/useDebounce';
import PetCard from './PetCard';
import useAuth from '../../../../hooks/useAuth';
import NoPetFound from '../../../Shared/NoPetsFound/NoPetFound';

const PetListing = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isChangingCategory, setIsChangingCategory] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: allPetsData = [], isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey: ["all-pets", selectedCategory, debouncedSearchTerm],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosPublic(`/pets?page=${pageParam}&limit=6&category=${selectedCategory}&seachByName=${debouncedSearchTerm}`);
            setIsChangingCategory(false);
            return res.data;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasMore) {
                return pages.length + 1;
            }
            return undefined;
        },
    });

    useEffect(() => {
        setIsChangingCategory(true);
    }, [selectedCategory, debouncedSearchTerm]);


    const { ref } = useInView({
        threshold: 1,
        onChange: (inView) => {
            if (inView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
                console.log("fetch new");
            }
            // console.log(inView, hasNextPage, !isFetchingNextPage);
        },
    });

    return (
        <div className="w-11/12 lg:w-10/12 xl:w-9/12 mx-auto py-10 max-w-[1440px]">
            <h1 className="text-3xl font-extrabold text-center mb-8 font-delius-regular">Available Pets for Adoption</h1>

            {/* 🔍 Search + Filter */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8 justify-between">
                <div className="w-full md:w-1/3">
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}

                    />
                </div>



                <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-56 bg-white">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="font-semibold">
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                        <SelectItem value="Rabbit">Rabbit</SelectItem>
                        <SelectItem value="Fish">Fish</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        {/* Add more as needed */}
                    </SelectContent>
                </Select>

            </div>

            {/* 🐾 Pet Cards */}
            <div className="grid gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {
                    isLoading || isChangingCategory ?
                        <>
                            {
                                [...Array(3)].map((_, i) =>
                                    <PetSkeletonCard key={i} />
                                )
                            }
                        </>
                        :
                        <>
                            {
                                allPetsData.pages[0].pets.length === 0 ?
                                    <NoPetFound />
                                    :
                                    allPetsData.pages.flatMap(page => page.pets).map((pet) =>
                                        <PetCard key={pet._id} pet={pet} user={user} refetch={refetch}/>
                                    )
                            }
                        </>
                }
            </div>
            
            {
                isFetchingNextPage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 mt-6 min-h-[30vh]">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={`${i === 2 ? "md:hidden xl:grid" : ""}`}>
                                <PetSkeletonCard />
                            </div>
                        ))}
                    </div>
                )
            }
            <div ref={ref} id="scroll-sentinel" className="mt-5 h-4" />
        </div >
    );
};

export default PetListing;
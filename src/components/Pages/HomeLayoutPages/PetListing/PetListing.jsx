import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { useInView } from "react-intersection-observer";
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';
import PetSkeletonCard from './PetSkeletonCard';
import NoPetFound from './NoPetFound';
import useDebounce from '../../../../hooks/useDebounce';

const PetListing = () => {
    const axiosPublic = useAxiosPublic();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [isChangingCategory, setIsChangingCategory] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: allPetsData = [], isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["all-pets", selectedCategory, debouncedSearchTerm],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosPublic(`/pets?page=${pageParam}&limit=6&category=${selectedCategory}&seachByName=${debouncedSearchTerm}`);
            setIsChangingCategory(false);
            return res.data;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasMore) {
                // console.log(lastPage);
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
            console.log(inView, hasNextPage, !isFetchingNextPage);
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
                                                    <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-1 hover:text-primary hover:scale-105 font-delius-regular">
                                                        <Link to={`/pet-details/${pet._id}`}>
                                                            {pet.petName}
                                                        </Link>
                                                    </h2>

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

                                            <div className='pb-5 px-10 lg:px-20 bg-white'>
                                                <div className='flex flex-wrap gap-3'>
                                                    <Link to={`/pet-details/${pet._id}`} className='flex-1'>
                                                        <Button className="w-full text-xs md:text-sm">View Details</Button>
                                                    </Link>
                                                    <Button className="flex-1 text-xs md:text-sm" variant={"outline"}>Request Adoption</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
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
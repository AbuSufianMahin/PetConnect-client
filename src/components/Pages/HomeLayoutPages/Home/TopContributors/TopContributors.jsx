import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import { Sparkles } from 'lucide-react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import { NavLink } from 'react-router';
import { Button } from '../../../../ui/button';

const TopContributors = () => {
    const axiosPublic = useAxiosPublic();

    const { data: topContributors = [], isLoading } = useQuery({
        queryKey: ["Top-contributors"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-contributors");
            return res.data;
        }
    });

    return (
        <section className="py-10 md:py-32 bg-gray-50 dark:bg-neutral-900">
            <div className="w-11/12 md:w-10/12 max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center mb-14 drop-shadow-md font-delius-regular text-gray-900 dark:text-gray-100">
                    Top 5 Contributors
                </h2>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Card
                                key={i}
                                className="p-6 shadow-lg rounded-xl bg-white dark:bg-neutral-800"
                            >
                                <Skeleton circle={true} height={60} width={60} />
                                <div className="mt-4">
                                    <Skeleton height={24} width="70%" />
                                    <Skeleton height={20} width="40%" className="mt-2" />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : topContributors.length === 0 ? (
                    <div className="flex flex-col items-center mt-12 text-muted-foreground">
                        <Sparkles className="w-14 h-14 mb-4 text-yellow-400" />
                        <p className="text-xl font-semibold mb-1">No contributions yet</p>
                        <p className="text-sm max-w-xs text-center">
                            Be the first to support a campaign!
                        </p>
                        <NavLink to="/donation-campaigns">
                            <Button size="sm" className="text-sm mt-5">Explore Donation Campaings</Button>
                        </NavLink>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {topContributors.map((contributor, index) => (
                            <Card
                                key={contributor.userEmail || contributor._id}
                                className="bg-white dark:bg-gray-300 transition-transform hover:scale-[1.03] cursor-pointer"
                                title={contributor.userEmail}
                            >
                                <CardContent className="flex items-center gap-5 p-6">
                                    <img
                                        src={
                                            contributor.photoURL ||
                                            "https://via.placeholder.com/60?text=No+Photo"
                                        }
                                        alt={contributor.userEmail}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                                        loading="lazy"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold truncate text-gray-900">
                                            {contributor.name}
                                        </h3>
                                        <h3 className="font-semibold truncate text-gray-500">
                                            {contributor.userEmail}
                                        </h3>
                                        <p className="text-green-600 font-semibold mt-1">
                                            Total Donated: ${contributor.totalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="default"
                                        className="text-base font-semibold min-w-[2.5rem] flex justify-center items-center"
                                    >
                                        #{index + 1}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopContributors;
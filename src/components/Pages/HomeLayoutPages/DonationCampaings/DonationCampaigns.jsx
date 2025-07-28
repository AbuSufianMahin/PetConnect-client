import { useInfiniteQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useInView } from 'react-intersection-observer';
import CampaignCard from './CampaignCard';
import CampaignCardSkeleton from './CampaignCardSkeleton';

import noDataGirlAnimation from "../../../../assets/LottieAnimations/noDataGirlAnimation.json"
import Lottie from 'lottie-react';

const DonationCampaigns = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: campaignsData = [], fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['donation-campaigns'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosPublic.get(`/donation-campaigns?page=${pageParam}&limit=6`)
            return res.data
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length + 1 : undefined
        },
    })

    const { ref } = useInView({
        threshold: 1,
        onChange: (inView) => {
            if (inView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        }
    })

    return (
        <section className="w-11/12 md:w-10/12 mx-auto py-10">
            <h1 className="text-3xl font-extrabold text-center mb-10 font-delius-regular">
                Ongoing Campaigns
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">



                {
                    isLoading ?
                        <>
                            {
                                [...Array(3)].map((_, i) => (
                                    <CampaignCardSkeleton key={i} />
                                ))
                            }
                        </>
                        :
                        <>
                            {
                                campaignsData?.pages[0].campaigns.length === 0 ?
                                    <div className="flex flex-col items-center justify-center col-span-3 mt-5">
                                        <div className='w-fit border rounded-full overflow-hidden'>
                                            <Lottie animationData={noDataGirlAnimation} loop={true}/>
                                        </div>
                                        <h2 className="mt-6 text-lg font-semibold text-gray-600 dark:text-gray-300">
                                            No Active Donation Campaigns Found
                                        </h2>
                                    </div>
                                    :
                                    campaignsData.pages.flatMap(page => page.campaigns).map((campaign) =>
                                        <CampaignCard key={campaign._id} campaign={campaign} user={user} />
                                    )
                            }
                        </>
                }
            </div>


            {/* Loader when fetching next page */}
            {
                isFetchingNextPage &&
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6  mt-4 md:mt-6'>
                    {
                        [...Array(3)].map((_, i) => (
                            <CampaignCardSkeleton key={i} />
                        ))
                    }
                </div>
            }
            <div ref={ref} className="mt-5 h-1" />
        </section>
    )
}


export default DonationCampaigns;
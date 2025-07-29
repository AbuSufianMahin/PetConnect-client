import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Progress } from '../../../ui/progress';
import { Button } from '../../../ui/button';
import DOMPurify from "dompurify";
import CampaignDetailsSkeleton from './CampaignDetailsSkeleton';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { DonateModal } from './DonateModal';
import RecommendedCampaigns from '../../../Shared/RecommendedCampaigns/RecommendedCampaigns';
import { CheckCircle, PauseCircle } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_stripe_secret_key);

const CampaignDetails = () => {
    const { campaignId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [openDonateModal, setOpenDonateModal] = useState(false);

    const { data: campaignData = {}, isLoading, refetch } = useQuery({
        queryKey: ["campaign", campaignId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/campaign-details/${campaignId}`);
            return data;
        },
    });

    const { petName, shortDescription, longDescription, deadline, maxDonationAmount, donatedAmount, photoURL, status } = campaignData;

    const progress = (donatedAmount / maxDonationAmount) * 100;

    return (
        <section className="w-11/12 md:w-10/12 mx-auto py-10 space-y-6">
            {
                isLoading ?
                    <CampaignDetailsSkeleton />
                    :
                    <div className="flex flex-col items-center xl:flex-row md:px-10 md:py-8 xl:gap-6 border rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-neutral-900 transition-all duration-300">
                        <div className='flex-2'>
                            {/* Header Image */}
                            <div className="relative w-full rounded-t-2xl md:rounded-b-2xl overflow-hidden shadow-lg">
                                <img
                                    src={photoURL}
                                    alt={petName}
                                    className="w-full max-h-72 xl:max-h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                                <div className="absolute bottom-4 left-2 md:left-6 z-20 text-white">
                                    <h1 className="text-xl md:text-3xl font-bold font-delius-regular">{petName}</h1>
                                    <p className="italic text-gray-300 text-sm md:text-base">{shortDescription}</p>
                                </div>
                            </div>

                            {/* Progress and Stats */}
                            <div className="space-y-2 w-9/10 mx-auto mt-5">
                                <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div>
                                        <span className="block text-xs text-gray-500">Target</span>
                                        <span className="text-lg font-semibold">${maxDonationAmount.toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500">Donated</span>
                                        <span className="text-lg font-semibold text-green-600">${donatedAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Progress value={progress} className="h-3" />
                                <div className='flex justify-between text-sm'>
                                    <p className='flex flex-col'>
                                        <span>{Math.round(progress)}% funded</span>
                                        <span>Remaining: ${(maxDonationAmount - donatedAmount).toLocaleString()}</span>
                                    </p>
                                    <p>
                                        Donation Ends: {new Date(deadline).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex-3 p-4'>
                            {/* Description */}
                            <div
                                className="rich-text-content prose prose-neutral max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(longDescription),
                                }}
                            />
                            {/* Donate Button */}
                            <div className="pt-4">
                                {status === "active" ? (
                                    <Button
                                        className="w-full md:w-auto px-6 py-2 font-semibold text-sm bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
                                        onClick={() => setOpenDonateModal(true)}
                                    >
                                        Donate Now
                                    </Button>
                                ) : status === "completed" ? (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-100 text-blue-700 border border-blue-300 shadow-sm">
                                        <CheckCircle className="w-5 h-5" />
                                        Completed
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl bg-yellow-100 text-yellow-700 border border-yellow-300 shadow-sm">
                                        <PauseCircle className="w-5 h-5" />
                                        Paused
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
            }

            <RecommendedCampaigns />

            <Elements stripe={stripePromise}>
                <DonateModal openDonateModal={openDonateModal} setOpenDonateModal={setOpenDonateModal} campaignData={campaignData} refetch={refetch} />
            </Elements>
        </section>
    );
};

export default CampaignDetails;
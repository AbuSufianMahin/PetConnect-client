import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Skeleton } from "../../..//ui/skeleton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const RecommendedCampaigns = () => {
    const axiosSecure = useAxiosSecure();

    const { data: recommendedCampaigns = [], isLoading } = useQuery({
        queryKey: ["recommendedCampaigns"],
        queryFn: async () => {
            const res = await axiosSecure.get("/recommended-campaigns");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-5/6" />
                            <Skeleton className="h-8 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recommended Campaigns</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {
                    recommendedCampaigns.map((campaign) => (
                        <div key={campaign._id} className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-neutral-800 group transition-transform duration-300 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">

                            {/* Image Header */}
                            <div className="relative min-h-36 md:h-72 overflow-hidden">
                                <img
                                    src={campaign.photoURL}
                                    alt={campaign.petName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

                                {/* Bottom Text */}
                                <div className="absolute bottom-3 left-4 z-20 text-white drop-shadow-xl">
                                    <h3 className="text-2xl font-bold font-delius-regular">{campaign.petName}</h3>
                                    <p className="text-sm italic text-gray-300">{campaign.shortDescription}</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="px-6 py-5 space-y-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg">
                                <p className="text-sm font-medium">
                                    ${campaign.donatedAmount.toLocaleString()} raised of ${campaign.maxDonationAmount.toLocaleString()}.
                                </p>

                                {/* Deadline */}
                                <p className="text-sm text-muted-foreground">
                                    Donation Ends:{" "}
                                    <span className="font-medium">
                                        {new Date(campaign.deadline).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </p>

                                {/* Action Button */}
                                <div>
                                    <Link
                                        to={`/campaign-details/${campaign._id}`}
                                        className="inline-block mt-2 text-primary underline hover:opacity-80"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </section>
    );
};

export default RecommendedCampaigns;

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CampaignCardSkeleton = () => {
    return (
        <div className="w-full mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-neutral-800 group transition-transform duration-300 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">

            {/* Image Header Placeholder */}
            <div className="h-60 md:h-72 overflow-hidden -mt-2">
                <Skeleton height={"100%"}/>
            </div>

            {/* Content Section Placeholder */}
            <div className="px-6 py-5 space-y-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg">

                {/* Target and Donated Placeholders */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div>
                        <Skeleton width={80} height={18} className="mb-1" />
                        <Skeleton width={80} height={20} />
                    </div>
                    <div>
                        <Skeleton width={80} height={18} className="mb-1" />
                        <Skeleton width={80} height={20} />
                    </div>
                </div>

                {/* Progress Bar Placeholder */}
                <Skeleton height={12} borderRadius={9999} />
                <Skeleton height={12} width={100}/>

                {/* Action Button Placeholder */}
                <div className="pt-4">
                    <Skeleton height={32} borderRadius={12} />
                </div>
            </div>
        </div>
    );
};

export default CampaignCardSkeleton;
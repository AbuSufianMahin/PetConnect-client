import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CampaignDetailsSkeleton = () => {
    return (
        <div className="flex flex-col items-center xl:flex-row md:px-10 md:py-8 xl:gap-6 border rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-neutral-900 transition-all duration-300">
            {/* Left section - Image and Stats */}
            <div className="flex-2 w-full">
                {/* Image Skeleton */}
                <div className="relative w-full rounded-t-2xl md:rounded-b-2xl overflow-hidden shadow-lg">
                    <Skeleton height={288} className="w-full" />
                    <div className="absolute bottom-4 left-2 md:left-6 z-20 text-white space-y-2">
                        <Skeleton width={150} height={30} />
                        <Skeleton width={200} height={18} />
                    </div>
                </div>

                {/* Progress and Stats */}
                <div className="space-y-2 w-9/10 mx-auto mt-5">
                    <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                        <div>
                            <Skeleton width={80} height={10} />
                            <Skeleton width={80} height={20} />
                        </div>
                        <div>
                            <Skeleton width={80} height={10} />
                            <Skeleton width={80} height={20} />
                        </div>
                    </div>
                    <Skeleton height={12} />
                    <div className='flex justify-between'>
                        <Skeleton width={120} height={16} />
                        <Skeleton width={120} height={16} />
                    </div>
                </div>
            </div>

            {/* Right section - Description and Button */}
            <div className="flex-3 p-4 w-full">
                <div className="space-y-4">
                    {/* Title */}
                    <Skeleton height={28} width="45%" className='mb-2' />

                    {/* Paragraph 1 */}
                    <div className="space-y-2">
                        <Skeleton height={18} width="65%" />
                        <Skeleton height={18} width="90%" />
                        <Skeleton height={18} width="40%" />
                    </div>

                    {/* Paragraph 2 */}
                    <div className="space-y-2">
                        <Skeleton height={18} width="93%" />
                        <Skeleton height={18} width="98%" />
                        <Skeleton height={18} width="50%" />
                    </div>

                    {/* Subheading or quote */}
                    <Skeleton height={22} width="30%" />

                    {/* Final lines */}
                    <Skeleton height={18} width="88%" />
                    <Skeleton height={18} width="70%" />
                </div>

                <div className="pt-4">
                    <Skeleton height={40} width={160} borderRadius={12} />
                </div>
            </div>
        </div>
    );
};

export default CampaignDetailsSkeleton;
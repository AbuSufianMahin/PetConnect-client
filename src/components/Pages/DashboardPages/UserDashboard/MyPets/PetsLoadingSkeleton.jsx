import React from 'react';

const PetsLoadingSkeleton = () => {
    return (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow flex flex-col animate-pulse bg-white">

                    <div className='-mt-1'>
                        <Skeleton className="w-fit h-72 object-cover" />
                    </div>

                    {/* Curved Content Area */}
                    <div className="relative px-6 py-8 -mt-20 pb-6 bg-white rounded-t-[30%] overflow-hidden flex flex-col justify-between h-full">

                        <div className="grid gap-1 text-center">
                            <Skeleton height={20} width="20%" />
                            <Skeleton height={16} width="30%" />
                            <Skeleton height={16} width="20%" />
                            <Skeleton height={16} width="40%" />
                            <Skeleton height={16} width="80%" />
                            <Skeleton height={16} width="70%" />
                            <Skeleton height={16} width="20%" />
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 text-center">
                            <Skeleton height={26} width={"70%"} />
                            <Skeleton height={26} width={"70%"} />
                            <Skeleton height={26} width={"70%"} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PetsLoadingSkeleton;
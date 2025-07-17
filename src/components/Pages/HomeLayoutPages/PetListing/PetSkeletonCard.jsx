import React from 'react';
import Skeleton from 'react-loading-skeleton';

const PetSkeletonCard = () => {
    return (
        <div className="rounded-2xl overflow-hidden shadow flex flex-col animate-pulse bg-white">

            <div className='-mt-1'>
                <Skeleton className="w-fit h-56 object-cover" />
            </div>

            {/* Curved Content Area */}
            <div className="relative p-4 md:px-16 md:py-10 lg:p-10 -mt-15 bg-white rounded-t-[100%] overflow-hidden flex flex-col">
                <div className='text-center'>
                    <Skeleton height={20} width="20%" />
                </div>
                <div className="grid text-center mt-2">
                    <Skeleton height={16} width="30%" />
                    <Skeleton height={16} width="20%" />
                    <Skeleton height={16} width="80%" />
                </div>

                {/* Action Buttons */}
            </div>
            <div className="grid pb-5 px-10 grid-cols-2 gap-3 text-center">
                <Skeleton height={30} width={"100%"} />
                <Skeleton height={30} width={"100%"} />
            </div>
        </div>
    );
};

export default PetSkeletonCard;
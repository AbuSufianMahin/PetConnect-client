import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const PetsLoadingSkeleton = ({rows}) => {
    return (
        <div className="rounded-xl overflow-hidden border">
            <div className="grid grid-cols-6 bg-secondary text-white text-center p-6">
            </div>
            {[...Array(rows)].map((_, index) => (
                <div
                    key={index}
                    className="grid grid-cols-12 items-center bg-white border-b p-4 gap-2"
                >
                    {/* Serial No. */}
                    <div className="text-center">
                        <Skeleton width={20} height={20} />
                    </div>

                    {/* Name */}
                    <div className="text-center font-bold col-span-2">
                        <Skeleton width={80} height={20} />
                    </div>

                    {/* Category */}
                    <div className="text-center">
                        <Skeleton width={50} height={20} />
                    </div>

                    {/* Image */}
                    <div className="flex justify-center col-span-3">
                        <Skeleton height={60} width={60} />
                    </div>

                    {/* Status badge */}
                    <div className="flex justify-center col-span-2">
                        <Skeleton width={90} height={28} borderRadius={12} />
                    </div>

                    {/* Update Button */}
                    <div className='col-span-3'>
                        <div className="flex justify-center">
                            <Skeleton width={150} height={36} borderRadius={8} />
                        </div>
                        <div className="flex justify-center">
                            <Skeleton width={150} height={36} borderRadius={8} />
                        </div>
                    </div>


                </div>
            ))}
        </div>
    );
};

export default PetsLoadingSkeleton;
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const ReceivedReqTableSkeleton = ({ rows }) => {
    return (
        <div className="rounded-xl overflow-hidden border">
            <div className="grid grid-cols-6 bg-secondary text-white text-center p-6">
            </div>
            {[...Array(rows)].map((_, index) => (
                <div
                    key={index}
                    className="grid grid-cols-24 items-center bg-white border-b p-4 gap-2"
                >
                    {/* Serial No. */}
                    <div className="text-center col-span-2">
                        <Skeleton width={20} height={20} />
                    </div>
                    <div className="grid gap-1 text-center font-bold col-span-2">
                        <Skeleton width={80} height={20} />
                        <Skeleton width={60} height={20} style={{ borderRadius: "40px" }} />
                    </div>

                    {/* Image */}
                    <div className="flex justify-center col-span-5">
                        <Skeleton height={80} width={80} />
                    </div>

                    {/* Status badge */}
                    <div className="flex justify-center col-span-3">
                        <Skeleton width={90} height={28} borderRadius={12} />
                    </div>

                    {/* timeStamp */}
                    <div className="text-center col-span-5 space-y-3">
                        <div>
                            <Skeleton width={70} height={14} />
                            <Skeleton width={120} height={14} />
                            <Skeleton width={50} height={14} />
                        </div>
                        <div>
                            <Skeleton width={70} height={14} />
                            <Skeleton width={120} height={14} />
                            <Skeleton width={50} height={14} />
                        </div>
                    </div>

                    {/* Requested by  */}
                    <div className='text-center col-span-7'>
                        <Skeleton width={80} height={16} />
                        <Skeleton width={100} height={16} />
                        <Skeleton width={150} height={16} />
                        <Skeleton width={100} height={16} />
                        <div className='flex justify-center gap-3 mt-2'>
                            <Skeleton width={100} height={24} borderRadius={6} />
                            <Skeleton width={100} height={24} borderRadius={6} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReceivedReqTableSkeleton;
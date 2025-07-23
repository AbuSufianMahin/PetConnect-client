import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DashboardLoadingSkeleton = () => {
    return (
        <>
            <div className="w-full p-4 space-y-6">
                {/* Sidebar link items */}
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="grid grid-cols-6 items-center gap-2">
                        <div>
                            <Skeleton
                                width={24}
                                height={24}
                                style={{ borderRadius: "30%" }}
                            />
                        </div>
                        <div className='col-span-5'>
                            <Skeleton height={20} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DashboardLoadingSkeleton;
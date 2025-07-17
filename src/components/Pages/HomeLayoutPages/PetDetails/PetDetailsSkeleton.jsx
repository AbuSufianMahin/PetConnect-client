import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
const PetDetailsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center rounded-3xl overflow-hidden bg-white shadow-lg border">
            {/* Image */}
            <div className="overflow-hidden shadow-sm bg-muted/20 h-full">
                <Skeleton className="w-full h-[300px] lg:h-full" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 justify-between h-full p-4 md:px-16 md:py-10 lg:p-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-20 rounded-3xl" />
                </div>

                {/* Short description */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />

                {/* Grid Info */}
                <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>

                <div className="my-2">
                    <Skeleton className="h-[1px] w-full bg-muted" />
                </div>

                {/* About section */}
                <div>
                    <Skeleton className="h-5 w-40 mx-auto mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>

                {/* Button */}
                <Skeleton className="h-10 w-full rounded-md mt-4" />
            </div>
        </div>
    );
};

export default PetDetailsSkeleton;
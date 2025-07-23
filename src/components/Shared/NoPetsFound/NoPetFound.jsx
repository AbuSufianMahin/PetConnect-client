import React from 'react';

import noDataFound from "../../../assets/LottieAnimations/no data found.json"
import Lottie from 'lottie-react';

const NoPetFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center col-span-3 min-h-[40vh]">
            <div>
                <Lottie animationData={noDataFound} className="md:h-[40vh]" loop={false} />
            </div>

            <h2 className="text-2xl font-bold mt-3 text-gray-800 dark:text-gray-200">
                No Pets Found
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
                We couldn’t find any pets to show at the moment.
            </p>
        </div>
    );
};

export default NoPetFound;
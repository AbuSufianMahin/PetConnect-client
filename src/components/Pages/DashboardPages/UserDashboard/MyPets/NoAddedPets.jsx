import React from 'react';
import Lottie from 'lottie-react';
import noDataFound from "../../../../../assets/LottieAnimations/no data found.json"
import { NavLink } from 'react-router';
import { Button } from '../../../../ui/button';
const NoAddedPets = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div>
                <Lottie animationData={noDataFound} className="md:h-[40vh]" loop={false} />
            </div>

            <h2 className="text-2xl font-bold mt-6 text-gray-800 dark:text-gray-200">
                No Pets Added Yet
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
                Looks like you haven't added any pets for adoption.
            </p>

            <div className='mt-2'>
                <NavLink to="/dashboard/add-pet">
                    <Button>Add a pet</Button>
                </NavLink>
            </div>
        </div>
    );
};

export default NoAddedPets;
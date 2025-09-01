import React from 'react';
import { Button } from '../../../../ui/button';
import adoptPetImg from "../../../../../assets/images/adopt-pet.jpg"
import { NavLink } from 'react-router';
const CallToAction = () => {
    return (
        <section id="about" className="py-10 md:py-32 bg-gray-50 dark:bg-neutral-900">
            <div className="w-11/12 md:w-10/12 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-12">
                {/* Text content */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-2 md:mb-4">
                        Give Them <span className="text-pink-500 dark:text-pink-400">Love</span>,
                        <br />
                        Give Them a <span className="text-green-600 dark:text-green-400">Home</span>
                    </h2>
                    <p className="text-sm md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-2 md:mb-6 max-w-xl">
                        Thousands of pets are waiting for a second chance. Adopt today and make a lifelong friend.
                        Your compassion could change a life — theirs and yours.
                    </p>
                    <NavLink to="/pet-listing">
                        <Button className="px-6 py-3 lg:text-lg text-white transition duration-300">
                            Browse Pets
                        </Button>
                    </NavLink>
                </div>

                {/* Inspirational image */}
                <div className=" flex-1">
                    <img
                        src={adoptPetImg}
                        alt="Adopt a pet"
                        className="rounded-xl md:shadow-md object-cover w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
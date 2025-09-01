import { Title } from '@radix-ui/react-dialog';
import React from 'react';
import { FaHeart, FaPaw, FaUsers } from 'react-icons/fa';
import { Card } from '../../../../ui/card';

const OurMissions = () => {
    const features = [
        {
            icon: <FaPaw className="text-indigo-600 dark:text-indigo-400" size={48} />,
            title: "Loving Care",
            description:
                "Every pet deserves kindness and a second chance at life. We encourage responsible adoption.",
        },
        {
            icon: <FaHeart className="text-red-500 dark:text-red-400" size={48} />,
            title: "Community Driven",
            description:
                "Join a vibrant community passionate about making a difference for animals everywhere.",
        },
        {
            icon: <FaUsers className="text-green-600 dark:text-green-400" size={48} />,
            title: "Effortless Experience",
            description:
                "Our user-friendly design makes it simple to find your new best friend or support campaigns you care about.",
        },
    ];
    return (
        <section id="missions" className="py-10 md:py-32 overflow-hidden">
            <div className='w-11/12 md:w-10/12 max-w-7xl mx-auto'>
                <h2 className="text-4xl font-extrabold text-center mb-12 drop-shadow-md font-delius-regular">
                    About Our <span className='text-primary'>Mission</span>
                </h2>
                <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
                    {features.map(({ icon, title, description }, index) => (
                        <div
                            data-aos={`${index == 0 ? `fade-right` : index == 1 ? "flip-up" : "fade-left"}`}
                            data-aos-offset={window.innerHeight / 2}
                            key={index}
                            className="bg-white dark:bg-gray-300 rounded-2xl p-8 shadow-md hover:shadow-2xl"
                        >
                            <div className="mb-6 flex justify-center">{icon}</div>
                            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">
                                {title}
                            </h3>
                            <p className="text-center text-gray-600  leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurMissions;
import React from 'react';

import error404Animation from "../../../assets/LottieAnimations/Error 404.json"
import Lottie from 'lottie-react';
import { NavLink } from 'react-router';
import { Button } from '../../ui/button';

const Error404Page = () => {
    return (
        <div className="min-h-screen bg-accent flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md w-full">
                <Lottie animationData={error404Animation} loop={true} className="w-full h-auto" />
                <h2 className="text-2xl font-bold mt-6 mb-2 text-foreground">Page Not Found</h2>
                <p className="text-muted-foreground mb-6">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <NavLink to="/">
                    <Button className="px-6 py-2 text-sm rounded-xl">Go to Home</Button>
                </NavLink>
            </div>
        </div>
    );
};

export default Error404Page;
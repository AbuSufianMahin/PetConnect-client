import React from 'react';
import forbiddenAnimation from "../../../assets/LottieAnimations/forbidden403.json"
import Lottie from 'lottie-react';
import { NavLink } from 'react-router';
import { Button } from '../../ui/button';
const ForbiddenPage = () => {
    return (
        <div className="min-h-screen bg-accent flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-md w-full">
                <Lottie animationData={forbiddenAnimation} loop={false} className="w-full h-auto" />
                <h2 className="text-2xl font-bold mt-6 mb-2 text-foreground">403 - Forbidden</h2>
                <p className="text-muted-foreground mb-6">
                    You don't have permission to access this page.
                </p>
                <NavLink to="/">
                    <Button className="px-6 py-2 text-sm rounded-xl">Back to Home</Button>
                </NavLink>
            </div>
        </div>
    );
};

export default ForbiddenPage;
import React from 'react';
import { Outlet } from 'react-router';

import happyDog from "../../../assets/LottieAnimations/Happy Dog.json"
import Lottie from 'lottie-react';

import PetConnectLogo from '../../Shared/PetConnectLogo/PetConnectLogo';


const AuthLayout = () => {
    return (
        <div className='bg-accent min-h-screen py-16'>
            <div className='grid lg:grid-cols-2 md:items-center xl:items-start w-11/12 xl:w-10/12 mx-auto min-h-[80vh] rounded-2xl overflow-hidden bg-muted'>

                <div className='py-6 md:py-8'>
                    <div className='flex justify-center'>
                        <PetConnectLogo></PetConnectLogo>
                    </div>

                    <div className='min-h-[68vh]'>
                        <Outlet></Outlet>
                    </div>

                </div>


                <div className='hidden lg:flex shadow-lg shadow-secondary order-1 h-full overflow-hidden bg-secondary lg:rounded-tl-3xl lg:rounded-bl-[30%]'>
                    <div className='flex items-center h-full mx-auto w-fit'>
                        <Lottie animationData={happyDog} style={
                            {
                                height: "40vh"
                            }
                        }></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
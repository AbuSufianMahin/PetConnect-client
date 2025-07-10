import React from 'react';
import logo from "../../../assets/images/PetConnect-logo.png"
import { Link } from 'react-router';

const PetConnectLogo = () => {
    return (
        <Link to='/' >
            <div className='flex items-center gap-2'>
                <div className='w-10 md:w-12 lg:w-14'>
                    <img src={logo} alt="pet connect logo" />
                </div>
                <h1 className='md:text-2xl font-extrabold font-delius-regular text-secondary'>PetConnect</h1>
            </div>
        </Link>
    );
};

export default PetConnectLogo;
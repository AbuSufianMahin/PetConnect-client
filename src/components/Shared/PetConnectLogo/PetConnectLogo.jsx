import React from 'react';
import logo from "../../../assets/images/PetConnect-logo.png"
import { Link } from 'react-router';

const PetConnectLogo = () => {
    return (

        <div className='flex items-center gap-2'>
            <Link to='/'>
                <div className='w-10 md:w-11 lg:w-14'>
                    <img src={logo} alt="pet connect logo" />
                </div>
            </Link>
            <Link to='/'>
                <h1 className='text-white md:text-2xl font-extrabold font-delius-regular'>PetConnect</h1>
            </Link>

        </div>
    );
};

export default PetConnectLogo;
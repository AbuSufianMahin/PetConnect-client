import React from 'react';
import logo from "../../../assets/images/PetConnect-logo.png"
import { Link } from 'react-router';

const PetConnectLogo = () => {
    return (
        <Link to='/' >
            <div className='w-14 flex items-center gap-2 border'>
                <img src={logo} alt="pet connect logo" />
                <h1 className='text-2xl font-extrabold'>PetConnect</h1>
            </div>
        </Link>
    );
};

export default PetConnectLogo;
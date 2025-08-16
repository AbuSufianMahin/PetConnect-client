import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Shared/Footer/Footer';

const HomeLayout = () => {
    return (
        <div className='bg-accent'>
            <Navbar></Navbar>
            <div className='min-h-[50vh]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;
import React from 'react';
import {
    NavigationMenuItem,
} from '@radix-ui/react-navigation-menu';


import { NavLink } from 'react-router';

const NavbarLinks = () => {

    const links = [
        { name: "Home", path: "/" },
        { name: "Pet Listing", path: "/pet-listing" },
        { name: "Donation Campaigns", path: "/donation-campaign" },
    ]

    return (
        <>
            {
                links.map((link, index) =>
                    <NavigationMenuItem key={index} className=''>
                        <NavLink to={link.path} className={`rounded-2xl p-2 font-medium text-secondary hover:text-primary transition-colors`}>{link.name}</NavLink>
                    </NavigationMenuItem>
                )
            }
        </>
    );
};

export default NavbarLinks;
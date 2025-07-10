import React from 'react';
import {
    NavigationMenuItem,
} from '@radix-ui/react-navigation-menu';

import { DrawerClose } from "../../ui/drawer"
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
                    <NavigationMenuItem key={index}>
                        {/* <DrawerClose asChild> */}
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `
                                    shadow w-full lg:w-fit lg:shadow-none
                                    relative inline-flex items-center justify-center
                                    rounded-xl px-5 py-2 text-sm font-semibold
                                    transition-all duration-300 ease-in-out
                                    backdrop-blur-md
                                    ${!isActive ? "hover:text-primary hover:bg-primary/10" : ""}
                                    ${isActive ? "text-white bg-primary hover" : ""}
                                    
                                `
                                }
                            >
                                <span className="relative z-10">{link.name}</span>

                            </NavLink>
                        {/* </DrawerClose> */}
                    </NavigationMenuItem>
                )
            }
        </>
    );
};

export default NavbarLinks;




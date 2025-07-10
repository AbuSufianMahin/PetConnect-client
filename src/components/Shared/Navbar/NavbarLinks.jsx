import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '@radix-ui/react-navigation-menu';


import { NavLink } from 'react-router';

const NavbarLinks = () => {

    const links = [
        { name: "Home", path: "/" },
        { name: "Pet Listing", path: "/pet-listing" },
        { name: "Donation Campaigns", path: "/donation-campaign" },
    ]

    const linkClass = "text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex gap-6">

                {
                    links.map((link, index) =>
                        <NavigationMenuItem key={index}>
                            <NavLink to={link.path} className={linkClass}>{link.name}</NavLink>
                        </NavigationMenuItem>
                    )
                }

            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarLinks;
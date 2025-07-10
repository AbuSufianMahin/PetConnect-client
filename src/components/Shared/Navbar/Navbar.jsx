import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Button } from '../../ui/button';
import PetConnectLogo from '../PetConnectLogo/PetConnectLogo';
import NavbarLinks from './NavbarLinks';

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { RxHamburgerMenu } from 'react-icons/rx';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@radix-ui/react-navigation-menu';
import { DrawerClose } from '../../ui/drawer';

const Navbar = () => {
    const [shouldCloseDrawer, setShouldCloseDrawer] = useState(false);
    const drawerCloseRef = useRef(false);

    useEffect(() => {
        if (shouldCloseDrawer) {
            drawerCloseRef.current.click();
            setShouldCloseDrawer(false);
        }
    }, [shouldCloseDrawer]);

    const navbarlinks = [
        { name: "Home", path: "/" },
        { name: "Pet Listing", path: "/pet-listing" },
        { name: "Donation Campaigns", path: "/donation-campaign" },
    ]

    return (
        <nav className="bg-background w-11/12 md:w-10/12 mx-auto shadow-md rounded-2xl flex items-center justify-between py-2 px-6">
            <div className='flex items-center gap-2'>
                <div className='lg:hidden'>
                    <Drawer direction="left">
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="shadow-none"><RxHamburgerMenu /></Button>
                        </DrawerTrigger>

                        <DrawerContent className="space-y-5 pt-5">
                            <div className='flex justify-center'>
                                <DrawerTitle><PetConnectLogo></PetConnectLogo></DrawerTitle>
                                <DrawerDescription></DrawerDescription>
                            </div>

                            <NavigationMenu className='flex flex-col justify-between h-full border-t-2 p-5'>
                                <NavigationMenuList className='space-y-5'>
                                    {
                                        navbarlinks.map((link, index) =>
                                            <NavigationMenuItem key={index}>

                                                <NavLink
                                                    onClick={() => setShouldCloseDrawer(true)}
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

                                            </NavigationMenuItem>
                                        )
                                    }

                                </NavigationMenuList>

                                <div className='md:hidden pt-6 border-t-2'>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <Link to="/login"><Button className="w-full">Login</Button></Link>
                                        <Link to="/register"><Button className="w-full">Register</Button></Link>
                                    </div>
                                </div>
                            </NavigationMenu>

                            <DrawerClose asChild>
                                <button ref={drawerCloseRef} className="hidden" />
                            </DrawerClose>
                        </DrawerContent>
                    </Drawer>
                </div>
                <PetConnectLogo></PetConnectLogo>
            </div>


            <div className='hidden lg:flex'>
                <NavigationMenu>
                    <NavigationMenuList className='flex gap-4'>

                        {/* navigation bar for large */}
                        <NavbarLinks navbarlinks={navbarlinks}></NavbarLinks>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="hidden md:flex gap-2">
                <Link to="/login"><Button variant={"outline"} className="rounded-xl text-secondary border-primary hover:border-accent">Login</Button></Link>
                <Link to="/register"><Button className="rounded-xl">Register</Button></Link>
            </div>



        </nav>

    );
};

export default Navbar;
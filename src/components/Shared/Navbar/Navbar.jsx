import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Button } from '../../ui/button';
import PetConnectLogo from '../PetConnectLogo/PetConnectLogo';
import NavbarLinks from './NavbarLinks';

import noDP from "../../../assets/icons/user.png"

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
import useAuth from '../../../hooks/useAuth';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { ChevronsUpDown } from 'lucide-react';
import ThemeToggler from './ThemeToggler';

const Navbar = () => {
    const { user, logOutUser } = useAuth();
    // console.log(user);

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
        { name: "Donation Campaigns", path: "/donation-campaigns" },
    ]

    const handleLogout = () => {
        logOutUser()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <nav className="bg-background w-11/12 md:w-10/12 mx-auto shadow-md rounded-2xl flex items-center justify-between py-2 px-6">
            <div className='flex items-center gap-2'>
                <div className='lg:hidden'>
                    <Drawer direction="left">
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="shadow-none"><RxHamburgerMenu /></Button>
                        </DrawerTrigger>

                        <DrawerContent className="pt-5">
                            <div className='flex justify-center mb-5'>
                                <DrawerTitle><PetConnectLogo></PetConnectLogo></DrawerTitle>
                                <DrawerDescription></DrawerDescription>
                            </div>

                            <NavigationMenu className='flex flex-col justify-between h-full border-t-2 p-3'>
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

                                <div className='md:hidden pt-4 border-t-2'>
                                    {
                                        user ?
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <DropdownMenu
                                                    >
                                                        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-amber-800">
                                                            <div>
                                                                <Avatar className="w-8 h-8">
                                                                    <AvatarImage src={user.photoURL || noDP} alt="user avatar" referrerPolicy='no-referrer' className=""/>
                                                                </Avatar>
                                                            </div>
                                                            <div className='text-start text-xs'>
                                                                <p>{user.displayName}</p>
                                                                <p>{user.email}</p>
                                                            </div>
                                                            <div>
                                                                <ChevronsUpDown className="ml-auto size-4" />
                                                            </div>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-36 flex flex-col justify-between gap-1">
                                                            <NavLink to="/dashboard">
                                                                <DropdownMenuItem className="shadow">
                                                                    Dashboard
                                                                </DropdownMenuItem>
                                                            </NavLink>
                                                            <DropdownMenuItem className="w-full">
                                                                <ThemeToggler></ThemeToggler>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className={"w-full p-0 border"}>
                                                                <Button className="text-xs w-full" onClick={handleLogout}>Logout</Button>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                            </div>
                                            :
                                            <div className='grid grid-cols-2 gap-2 '>
                                                <Link to="/login"><Button className="w-full">Login</Button></Link>
                                                <Link to="/register"><Button className="w-full">Register</Button></Link>
                                            </div>
                                    }
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
                    <NavigationMenuList className='flex gap-2'>

                        {/* navigation bar for large devices*/}
                        <NavbarLinks navbarlinks={navbarlinks}></NavbarLinks>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="hidden md:flex gap-2 min-w-20">
                {
                    user ?
                        <div className='flex mx-auto'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar className="h-14 w-14 border-2 border-green-500">
                                                <AvatarImage src={user.photoURL || noDP} alt="user avatar" referrerPolicy='no-referrer' className="object-cover"/>
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent className={"text-sm"}>
                                            <p><span className='font-bold'>Name:</span> {user.displayName}</p>
                                            <p><span className='font-bold'>Email:</span> {user.email}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-36">
                                    <NavLink to="/dashboard/my-pets">
                                        <DropdownMenuItem className="shadow">
                                            Dashboard
                                        </DropdownMenuItem>
                                    </NavLink>
                                    <div className='mt-2'>
                                        <ThemeToggler></ThemeToggler>
                                    </div>
                                    <div className='text-center mt-2 pt-2 border-t-2'>
                                        <Button onClick={handleLogout} className="w-full">
                                            Logout
                                        </Button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        :
                        <div className='flex gap-2 justify-center'>
                            <Link to="/login"><Button variant={"outline"} className="rounded-xl text-secondary border-primary hover:border-accent">Login</Button></Link>
                            <Link to="/register"><Button className="rounded-xl">Register</Button></Link>
                        </div>
                }
            </div>
        </nav>

    );
};

export default Navbar;
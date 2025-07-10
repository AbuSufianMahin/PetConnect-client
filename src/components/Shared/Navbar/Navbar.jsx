import React from 'react';
import { Link } from 'react-router';
import { Button } from '../../ui/button';
import PetConnectLogo from '../PetConnectLogo/PetConnectLogo';
import NavbarLinks from './NavbarLinks';

const Navbar = () => {
    return (

        <nav className="w-11/12 md:w-10/12 mx-auto border-b flex items-center justify-between">
            {/* Left: Logo */}
            <PetConnectLogo></PetConnectLogo>

            {/* Center: Navigation Links using shadcn NavigationMenu */}
            <NavbarLinks></NavbarLinks>

            {/* Right: Login/Register Buttons */}
            <div className="flex gap-3">
                <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link to="/register">Register</Link>
                </Button>
            </div>
        </nav>

    );
};

export default Navbar;
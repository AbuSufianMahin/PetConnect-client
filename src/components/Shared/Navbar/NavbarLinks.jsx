
import {
    NavigationMenuItem,
} from '@radix-ui/react-navigation-menu';
import { NavLink } from 'react-router';

const NavbarLinks = ({ navbarlinks }) => {

    return (
        <>
            {
                navbarlinks.map((link, index) =>
                    <NavigationMenuItem key={index}>

                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `   text-white
                                    shadow w-full lg:w-fit lg:shadow-none
                                    relative inline-flex items-center justify-center
                                    rounded-xl px-5 py-2 text-sm font-semibold
                                    transition-all duration-300 ease-in-out
                                    backdrop-blur-md
                                    ${!isActive ? "hover:bg-primary" : ""}
                                    ${isActive ? "text-white bg-primary" : ""}
                                    
                                `
                            }
                        >
                            <span className="relative z-10">{link.name}</span>

                        </NavLink>

                    </NavigationMenuItem>
                )
            }
        </>
    );
};

export default NavbarLinks;




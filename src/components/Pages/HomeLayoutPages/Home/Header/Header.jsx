import React from 'react';
import { Button } from '../../../../ui/button';
import { Separator } from '../../../../ui/separator';
import PetCategories from './PetCategories';
import bannerImage from "../../../../../assets/images/petGroup.png"
import { Link, NavLink } from 'react-router';
const Header = () => {
    return (
        <section className="w-11/12 md:w-10/12 max-w-7xl mx-auto border my-5 xl:my-10 rounded-4xl overflow-hidden shadow-lg">
            <header className="relative">
                <div className='bg-[#420D17] pt-8 pb-6 md:pt-12 md:pb-4 lg:pt-16 lg:pb-2 xl:pt-6 xl:pb-0'>
                    <div className='w-9/10 mx-auto xl:flex md:pb-0'>
                        <div className='flex-1 flex items-center justify-center text-center xl:text-start'>
                            <div className='w-11/12'>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-delius-regular leading-tight">
                                    Find the Right <br /> Pet for You
                                </h1>

                                <p className="mt-4 text-sm sm:text-lg md:text-xl text-white/90 max-w-xl">
                                    Discover your perfect furry (or finned!) companion. Browse, connect, and adopt with ease on PetConnect.
                                </p>
                            </div>
                        </div>
                        <div className='flex-1 mx-auto md:w-2/3'>
                            <img src={bannerImage} alt="pet group" className='w-full' />
                        </div>
                    </div>
                </div>

                <div className="absolute left-1/2 bg-muted bottom-0 translate-x-[-50%] translate-y-1/2 flex md:gap-1 lg:gap-2 justify-around items-center px-1 py-2 md:py-3 md:px-2 rounded-xl shadow-lg z-10 h-12 lg:h-14 md:w-2/3 xl:w-1/3">
                    <NavLink to="/pet-listing" className="flex-1">
                        <Button variant="ghost" className="hover:text-secondary p-3 w-full text-xs md:text-sm">Pets</Button>
                    </NavLink>
                    <Separator orientation="vertical" />

                    <NavLink to="/donation-campaigns" className="flex-1">
                        <Button variant="ghost" className="hover:text-secondary p-3 w-full text-xs md:text-sm">Campaigns</Button>
                    </NavLink>
                    <Separator orientation="vertical" />

                    <NavLink to="" className="flex-1">
                        <Button
                            variant="ghost"
                            className="hover:text-secondary p-3 w-full text-xs md:text-sm"
                            onClick={() =>
                                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            About Us
                        </Button>
                    </NavLink>
                    <Separator orientation="vertical" />

                    <NavLink to="" className="flex-1">
                        <Button
                            variant="ghost"
                            className="hover:text-secondary p-3 w-full text-xs md:text-sm"
                            onClick={() =>
                                document.getElementById("missions")?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Missions
                        </Button>
                    </NavLink>
                </div>
            </header>

            <div>
                <PetCategories />
            </div>
        </section>
    );
};

export default Header;
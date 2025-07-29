import { FaTwitter, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa"
import { Link, NavLink } from 'react-router';

import logo from "../../../assets/images/PetConnect-logo.png"
const Footer = () => {
    return (
        <div>
            <footer className="bg-secondary text-background py-20 px-4">
                <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-end">

                    <div className="space-y-5">
                        <div className='flex flex-col w-fit gap-2'>
                            <div className='w-10 md:w-12 lg:w-14 mx-auto'>
                                <NavLink to="/"><img src={logo} alt="pet connect logo" /></NavLink>
                            </div>
                            <NavLink to="/"><h1 className='md:text-2xl font-extrabold font-delius-regular text-accent-foreground'>PetConnect</h1></NavLink>
                        </div>
                        <p className="text-sm">
                            Connecting paws with hearts. <br />
                            Adopt. Donate. Make a change.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#"><FaFacebook className="h-6 w-6 md:h-8 md:w-8 text-accent-foreground hover:text-primary"/></Link>
                            <Link href="#"><FaTwitter className="h-6 w-6 md:h-8 md:w-8 text-accent-foreground hover:text-primary"/></Link>
                            <Link href="#"><FaInstagram className="h-6 w-6 md:h-8 md:w-8 text-accent-foreground hover:text-primary"/></Link>
                            <Link href="#"><FaGithub className="h-6 w-6 md:h-8 md:w-8 text-accent-foreground hover:text-primary"/></Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-accent-foreground mb-3">Explore</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink className="hover:underline" to="/">Home</NavLink></li>
                            <li><NavLink className="hover:underline" to="/pet-listing">Pet Listing</NavLink></li>
                            <li><NavLink className="hover:underline" to="/donation-campaigns">Donation Campaigns</NavLink></li>
                            <li><NavLink className="hover:underline" to="/about-us">About Us</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-accent-foreground mb-3">Account</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink className="hover:underline" to="/login">Login</NavLink></li>
                            <li><NavLink className="hover:underline" to="/register">Register</NavLink></li>
                            <li><NavLink className="hover:underline" to="/dashboard">Dashboard</NavLink></li>
                            <li><NavLink className="hover:underline" to="/add-pet">Add a Pet</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-accent-foreground mb-3">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink className="hover:underline" to="/faqs">FAQs</NavLink></li>
                            <li><NavLink className="hover:underline" to="/privacy-policy">Privacy Policy</NavLink></li>
                            <li><NavLink className="hover:underline" to="/terms">Terms & Conditions</NavLink></li>
                            <li><NavLink className="hover:underline" to="/contact">Contact Us</NavLink></li>
                        </ul>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;
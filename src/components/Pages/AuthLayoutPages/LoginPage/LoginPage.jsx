import PetConnectLogo from '../../../Shared/PetConnectLogo/PetConnectLogo';

import happyDog from "../../../../assets/LottieAnimations/Happy Dog.json"
import Lottie from 'lottie-react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { Link } from 'react-router';

import googleIcon from "../../../../assets/icons/google.png"
import facebookIcon from "../../../../assets/icons/facebook.png"

const LoginPage = () => {


    return (
        <div className='bg-accent border-pink-300 min-h-screen py-20'>
            <div className='grid lg:grid-cols-2 md:items-center xl:items-start w-11/12 md:w-10/12 mx-auto min-h-[80vh] rounded-2xl overflow-hidden bg-muted'>

                <div className='py-10'>
                    <div className='flex justify-center'>
                        <PetConnectLogo></PetConnectLogo>
                    </div>
                    <div className="w-4/5 xl:w-7/10 mx-auto">

                        <div className='space-y-2 my-5 md:w-2/3 lg:w-8/10 mx-auto text-center'>
                            <h2 className="text-2xl font-semibold">Welcome Back!</h2>
                            <p className="text-sm text-muted-foreground">
                                Login to your account to adopt a pet, manage your listings, or support a campaign.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4 flex-1">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                // value={form.email}
                                // onChange={handleChange}
                                required
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                // value={form.password}
                                // onChange={handleChange}
                                required
                            />

                            <div className="text-right text-sm">
                                <Link to="/forgot-password" className="text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button type="submit" className="w-full">
                                Login
                            </Button>

                            {/* Divider */}
                            <div className="flex items-center">
                                <div className='border flex-1'></div>
                                <div className='mx-5 text-gray-500 text-xs sm:text-sm md:text-base'>Or Continue With</div>
                                <div className='border flex-1'></div>
                            </div>

                            {/* Social buttons */}
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full"><img src={googleIcon} className='w-4'/> Google</Button>
                                <Button variant="outline" className="w-full"><img src={facebookIcon} className='w-4'/>Facebook</Button>
                            </div>
                        </form>

                        {/* Sign up prompt */}
                        <p className="text-center text-sm mt-8">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>


                <div className='order-1 h-full overflow-hidden bg-secondary rounded-lg lg:rounded-bl-[30%]'>
                    <div className='flex h-full mx-auto w-fit'>
                        <Lottie animationData={happyDog}></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );



};

export default LoginPage;
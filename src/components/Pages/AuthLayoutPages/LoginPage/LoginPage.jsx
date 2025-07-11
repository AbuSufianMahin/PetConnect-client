import { Link } from 'react-router';
import PetConnectLogo from '../../../Shared/PetConnectLogo/PetConnectLogo';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';


import facebookIcon from "../../../../assets/icons/facebook.png"
import googleIcon from "../../../../assets/icons/google.png"


const LoginPage = () => {
    return (
        <div className="w-4/5 xl:w-7/10 mx-auto md:mt-8">
            <div className='space-y-2 my-5 md:w-2/3 lg:w-8/10 mx-auto text-center font-delius-regular'>
                <h2 className="text-2xl font-bold font-delius-regular">Welcome Back!</h2>
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
                    <Button variant="outline" className="w-full" type="button"><img src={googleIcon} className='w-4' /> Google</Button>
                    <Button variant="outline" className="w-full" type="button"><img src={facebookIcon} className='w-4' />Facebook</Button>
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
    );



};

export default LoginPage;
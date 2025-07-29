import { Link, useLocation, useNavigate } from 'react-router';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';

import githubIcon from "../../../../assets/icons/github.png"
import googleIcon from "../../../../assets/icons/google.png"
import useAuth from '../../../../hooks/useAuth';
import { useEffect, useState } from 'react';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import { errorAlert } from '../../../../Utilities/sweetAlerts';
import { TbLoader } from 'react-icons/tb';
import { getFirebaseAuthError } from '../../../../Utilities/getFirebaseAuthError';
import useSendUserDetails from '../../../../hooks/useSendUserDetails';
import { successToast, warningToast } from '../../../../Utilities/toastAlerts';


const LoginPage = () => {
    const { googleLogin, githubLogin, signInEmailUser } = useAuth();
    const sendUserDetailsToBackend = useSendUserDetails();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            warningToast('You need to log in first!');
        }
    }, [location.state])

    const [showPass, setShowPass] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const handleEmailSignIn = (data) => {
        setIsValidating(true);
        const { email, password } = data;
        signInEmailUser(email, password)
            .then(() => {
                navigate(location.state || '/');
            })
            .catch((error) => {
                errorAlert("Log in Failed!", getFirebaseAuthError(error.code));
            })
            .finally(() => setIsValidating(false))
    }
    const [isGoogleClicked, setIsGoogleClicked] = useState(false);

    const handleGoogleSignIn = () => {
        setIsGoogleClicked(true);
        googleLogin()
            .then(async (result) => {
                const response = await sendUserDetailsToBackend(result);
                if (response.isDuplicate) {
                    successToast("Welcome back to PetConnect!", 2000)
                }
                else {
                    successToast("Thanks for joining PetConnect — welcome aboard!", 2000);
                }
            })
            .then(() => {
                navigate(location.state || '/');
            })
            .catch((error) => {
                errorAlert("Log in Failed!", getFirebaseAuthError(error.code));
            })
            .finally(() => {
                setIsGoogleClicked(false);
            })
    }


    const [isGithubClicked, setIsGithubClicked] = useState(false);

    const handleGithubSignIn = () => {
        setIsGithubClicked(true);
        githubLogin()
            .then(async (result) => {
                const response = await sendUserDetailsToBackend(result);
                if (response.isDuplicate) {
                    successToast("Welcome back to PetConnect!", 2000)
                }
                else {
                    successToast("Thanks for joining PetConnect — welcome aboard!", 2000)
                }
            })
            .then(() => {
                navigate(location.state || '/');
            })
            .catch((error) => {
                errorAlert("Log in Failed!", getFirebaseAuthError(error.code));
            })
            .finally(() => {
                setIsGithubClicked(false);
            })
    }


    return (
        <div className="w-4/5 xl:w-7/10 mx-auto md:mt-8">
            <div className='space-y-2 my-5 md:w-2/3 lg:w-8/10 mx-auto text-center font-delius-regular'>
                <h2 className="text-2xl font-bold font-delius-regular">Welcome Back!</h2>
                <p className="text-sm text-muted-foreground">
                    Login to your account to adopt a pet, manage your listings, or support a campaign.
                </p>
            </div>

            <div className='md:w-8/10 mx-auto'>
                {/* Social buttons */}
                <div className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn} disabled={isGoogleClicked}>
                        <img src={googleIcon} className='w-5' />
                        Google
                        {
                            isGoogleClicked && <TbLoader className='animate-spin' />
                        }

                    </Button>
                    <Button variant="outline" className="w-full" type="button" onClick={handleGithubSignIn} disabled={isGithubClicked}>
                        <img src={githubIcon} className='w-5' />
                        Github
                        {
                            isGithubClicked && <TbLoader className='animate-spin' />
                        }
                    </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-5">
                    <div className='border flex-1'></div>
                    <div className='mx-2 md:mx-5 text-gray-500 text-xs sm:text-sm md:text-base'>Or Continue With</div>
                    <div className='border flex-1'></div>
                </div>

                {/* Form */}
                <form className="space-y-4 flex-1" onSubmit={handleSubmit(handleEmailSignIn)}>
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && <p className="text-red-500 mt-1 ml-1 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className='relative'>
                        <Input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute inset-y-0 right-2 flex items-center px-3 text-muted-foreground hover:text-white hover:bg-primary rounded-full"
                        >
                            {
                                showPass ?
                                    <FaRegEyeSlash />
                                    :
                                    <FaRegEye />
                            }
                        </Button>
                        {errors.password && <p className="text-red-500 mt-1 ml-1 text-xs">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isValidating}>
                        Login
                        {
                            isValidating && <TbLoader className='animate-spin' />
                        }
                    </Button>
                </form>

                {/* Sign up prompt */}
                <p className="text-center text-sm mt-4 md:mt-8">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );



};

export default LoginPage;
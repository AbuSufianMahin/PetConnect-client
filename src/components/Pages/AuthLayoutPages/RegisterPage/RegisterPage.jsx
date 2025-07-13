import React, { useState } from 'react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbLoader } from "react-icons/tb";

import githubIcon from "../../../../assets/icons/github.png"
import googleIcon from "../../../../assets/icons/google.png"

import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';

const RegisterPage = () => {
    const { createUserWithEmail, updateUserInfo } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [pass, setPass] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailRegister = (data) => {
        setIsSubmitting(true);
        const { userName, email, password } = data;

        createUserWithEmail(email, password)
            .then(() => {
                updateUserInfo({ userName })
                    .catch((error) => {
                        errorAlert("", error.message)
                        return;
                    });

                successAlert("Welcome", "Your account has been created successfully.")
                    .then(() => navigate("/"));
            })
            .catch((error) => {
                errorAlert("Registration Failed!", error.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }

    const handleGoogleSignUp = () => {

    }

    const handleGithubSignUp = () =>{

    }
    
    return (
        <div className="w-4/5 xl:w-7/10 mx-auto md:mt-8">
            <div className='space-y-2 my-5 md:w-2/3 lg:w-8/10 mx-auto text-center font-delius-regular'>
                <h2 className="text-2xl font-bold">Create and Account</h2>
                <p className="text-sm text-muted-foreground">
                    Join our pet-loving community to adopt, donate, or list pets in need of a new home.
                </p>
            </div>

            <div className='md:w-8/10 mx-auto'>
                {/* Social buttons */}
                <div className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full" type="button"><img src={googleIcon} className='w-5' onClick={handleGoogleSignUp}/> Google</Button>
                    <Button variant="outline" className="w-full" type="button"><img src={githubIcon} className='w-5' onClick={handleGithubSignUp}/>Github</Button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-5">
                    <div className='border flex-1'></div>
                    <div className='mx-2 md:mx-5 text-gray-500 text-xs sm:text-sm md:text-base'>Or Continue With</div>
                    <div className='border flex-1'></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleEmailRegister)} className="space-y-4 flex-1">

                    <div>
                        <Input
                            type="text"
                            placeholder="Your Name"
                            {...register("userName", { required: true })}
                        />
                        {errors.userName && <p className='text-red-500 mt-1 ml-1 text-xs'>User name is required</p>}
                    </div>
                    {/* <div className="flex items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        required
                        className="hidden"
                    />

                    <Button type="button" variant="outline" onClick={handleClick} className="text-muted-foreground">
                        Upload photo
                    </Button>

                    <span className="text-sm text-muted-foreground">No file selected</span>
                </div> */}
                    <div>
                        <Input
                            type="email"
                            placeholder="Your Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className='text-red-500 mt-1 ml-1 text-xs'>Email is required</p>}
                    </div>
                    <div className='relative'>
                        <Input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"

                            {...register('password', {
                                onChange: (e) => setPass(e.target.value),
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                                    message:
                                        'Password must include uppercase, lowercase, number, and special character',
                                },
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

                        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
                    </div>
                    <div className="relative">
                        <Input
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...register("confirmPass", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === pass || 'Passwords do not match',
                            })}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute inset-y-0 right-2 flex items-center px-3 text-muted-foreground hover:text-white hover:bg-primary rounded-full"
                        >
                            {
                                showConfirmPass ?
                                    <FaRegEyeSlash />
                                    :
                                    <FaRegEye />
                            }
                        </Button>
                        {errors.confirmPass && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPass.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        Register
                        {
                            isSubmitting && <TbLoader className='animate-spin' />
                        }
                    </Button>

                </form>

                {/* Sign up prompt */}
                <p className="text-center text-sm mt-4 md:mt-8">
                    Don't have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
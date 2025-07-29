import React, { useRef, useState } from 'react';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbLoader } from "react-icons/tb";

import githubIcon from "../../../../assets/icons/github.png"
import googleIcon from "../../../../assets/icons/google.png"

import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import { UploadCloud, X } from 'lucide-react';
import useCloudinaryUpload from '../../../../hooks/useCloudynariUpload';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { getFirebaseAuthError } from '../../../../Utilities/getFirebaseAuthError';
import useSendUserDetails from '../../../../hooks/useSendUserDetails';
import { successToast } from '../../../../Utilities/toastAlerts';


const RegisterPage = () => {
    const { createUserWithEmail, updateUserInfo, googleLogin, githubLogin } = useAuth();
    const { uploadImage } = useCloudinaryUpload();
    const axiosPublic = useAxiosPublic();

    const sendUserDetailsToBackend = useSendUserDetails();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [pass, setPass] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailRegister = async (data) => {

        setIsSubmitting(true);
        const { userName, email, password, photoFile } = data;

        // file size validation
        // if ((size / 1024 / 1024) > 2) {
        //     alert("File too big! Must be less than 2MB");
        //     return;
        // }

        createUserWithEmail(email, password)
            .then(async () => {
                const photoURL = await uploadImage(photoFile);
                updateUserInfo({ displayName: userName, photoURL })
                    .then(() => {
                        const userInfo = {
                            name: userName,
                            email: email,
                            photoURL: photoURL,
                            role: "user",
                            role_created_at: new Date().toISOString(),
                            role_updated_at: new Date().toISOString(),
                            role_updated_by: "default",

                            // optional
                            isBanned: false,
                            banned_at: null,
                            banned_by: null,
                        }

                        axiosPublic.post("/users", userInfo)
                            .then((res) => {
                                console.log(res.data);
                            });

                    })
                    .then(() => {
                        successAlert("Welcome", "Your account has been created successfully.")
                            .then(() => navigate(location.state || '/'));
                    })
                    .catch((error) => {
                        errorAlert("", error.message)
                        return;
                    });
            })
            .catch((error) => {
                errorAlert("Registration Failed!", error.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));

            setValue("photoFile", file, { shouldValidate: true });
        }
    };

    const clearImage = () => {
        setImage(null);
        setPreview(null);
        inputRef.current.value = "";
        setValue("photoFile", null, { shouldValidate: true });
    };

    const [isGoogleClicked, setIsGoogleClicked] = useState(false);

    const handleGoogleSignUp = () => {
        setIsGoogleClicked(true);
        googleLogin()
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
                setIsGoogleClicked(false);
            })
    }

    const [isGithubClicked, setIsGithubClicked] = useState(false);

    const handleGithubSignUp = () => {
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
        <div className="w-4/5 xl:w-7/10 mx-auto md:mt-5">
            <div className='space-y-2 my-5 md:w-2/3 lg:w-8/10 mx-auto text-center font-delius-regular'>
                <h2 className="text-2xl font-bold">Create an Account</h2>
                <p className="text-sm text-muted-foreground">
                    Join our pet-loving community to adopt, donate, or list pets in need of a new home.
                </p>
            </div>

            <div className='md:w-8/10 mx-auto'>
                {/* Social buttons */}
                <div className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full" type="button" disabled={isGoogleClicked} onClick={handleGoogleSignUp}>
                        <img src={googleIcon} className='w-5' />
                        Google
                        {
                            isGoogleClicked && <TbLoader className='animate-spin' />
                        }
                    </Button>
                    <Button variant="outline" className="w-full" type="button" disabled={isGithubClicked} onClick={handleGithubSignUp} >
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
                <form onSubmit={handleSubmit(handleEmailRegister)} className="space-y-4 flex-1">
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            {preview ?
                                <>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-20 h-20 rounded-full object-cover border shadow"
                                    />
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={clearImage}
                                        className="absolute -top-2 -right-2 rounded-full h-6 w-6 p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </>
                                :
                                <div className='flex flex-col items-center gap-2'>
                                    <div
                                        onClick={() => inputRef.current.click()}
                                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-dashed cursor-pointer hover:bg-accent transition"
                                    >
                                        <UploadCloud className="w-6 h-6" />

                                    </div>
                                    <p>Upload photo</p>
                                </div>
                            }
                        </div>

                        <Input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Hidden registered input for validation */}
                        <Input
                            type="hidden"
                            {...register("photoFile", { required: "Photo is required" })}
                        />

                        {errors.photoFile && (
                            <p className="text-xs text-red-500">{errors.photoFile.message}</p>
                        )}


                        {image && (
                            <Button variant="outline" type="button" className="text-xs px-2 md:px-3" onClick={() => inputRef.current.click()}>
                                Change Photo
                            </Button>
                        )}
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder="Your Name"
                            {...register("userName", { required: true })}
                        />
                        {errors.userName && <p className='text-red-500 mt-1 ml-1 text-xs'>User name is required</p>}
                    </div>

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
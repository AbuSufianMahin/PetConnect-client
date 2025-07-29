import { useRef, useState } from 'react';
"use client"
import { Input } from "../../../../ui/input"
import { Label } from "../../../../ui/label"
import { Button } from "../../../../ui/button"
import { ImagePlus } from "lucide-react"
import { useForm } from 'react-hook-form';
import LongDescriptionInput from '../../../../Shared/LongDescriptionInput/LongDescriptionInput';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useCloudinaryUpload from '../../../../../hooks/useCloudynariUpload';
import helpSeekingAnimation from "../../../../../assets/LottieAnimations/helpSeekingAnimation.json"
import Lottie from 'lottie-react';
import AnimatedFormError from '../../../../Shared/AnimatedFormError/AnimatedFormError';
import DatePickerInput from '../../../../Shared/DatePickerInput/DatePickerInput';
import { confirmAction, errorAlert, successAlert } from '../../../../../Utilities/sweetAlerts';
import { TbLoader } from 'react-icons/tb';


const CreateCampaignPage = () => {
    const { user } = useAuth();
    const { uploadImage } = useCloudinaryUpload();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
            longDescription: '',
        },
    })

    const longDescription = watch('longDescription');

    const inputImageRef = useRef();
    const [imagePreview, setImagePreview] = useState(null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue("petPictureFile", file, { shouldValidate: true });
        }
    };

    const clearImage = () => {
        setImagePreview(null);
        inputImageRef.current.value = "";
        setValue("petPictureFile", null, { shouldValidate: true });
    }

    const handleDateChange = (date) => {
        const isoDate = date?.toISOString()
        setValue("deadline", isoDate, { shouldValidate: true })
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetDate, setResetDate] = useState(false);

    const handleCampaignFormSubmit = (data) => {
        setResetDate(false);
        const { deadline, longDescription, maxDonationAmount: rawMaxDonationAmount, shortDescription, petName, petPictureFile } = data;
        const maxDonationAmount = parseInt(rawMaxDonationAmount, 10);

        confirmAction("Create Campaign?", "Once created, you'll be able to manage and track donations from your dashboard.", "Create Campaign", "question")
            .then(async (result) => {
                try {
                    if (result.isConfirmed) {
                        setIsSubmitting(true);

                        const photoURL = await uploadImage(petPictureFile);
                        // const photoURL = "imageLink";

                        const campaignData = {
                            petName,
                            shortDescription,
                            longDescription,
                            deadline,
                            maxDonationAmount,
                            photoURL,
                            organizerEmail: user.email,

                            //default values
                            donatedAmount: 0,
                            donators: [],
                            status: "active",
                            createdAt: new Date().toISOString(),
                        };

                        console.log(campaignData);
                        await axiosSecure.post(`/create-campaign?email=${user.email}`, campaignData)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    successAlert("Campaign Created!", res.data.message || "Your donation campaign is now live.");

                                    // Reset fields
                                    reset({
                                        petName: '',
                                        shortDescription: '',
                                        longDescription: '',
                                        deadline: null,
                                        maxDonationAmount: '',
                                        petPictureFile: null,
                                    });
                                    clearImage();
                                    setValue("petPictureFile", null, { shouldValidate: false });
                                    setValue("longDescription", null, { shouldValidate: true });
                                    setValue("deadline", null, { shouldValidate: true })
                                    setResetDate(true);
                                }
                            })
                            .catch((error) => {
                                errorAlert("Unable to Create Campaign", error.response?.data?.message || "Please try again later.");
                            });
                    }
                } catch (error) {
                    console.error(error);
                    errorAlert("Something Went Wrong", "Could not upload photo.");
                } finally {
                    setIsSubmitting(false);
                }
            })
    }

    return (
        <section className="w-11/12 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Create Donation Campaign</h1>

            <div className='grid xl:grid-cols-2 gap-24 items-center  lg:max-w-3xl xl:max-w-full'>
                <form className='space-y-4' onSubmit={handleSubmit(handleCampaignFormSubmit)}>
                    {/* Pet Name */}
                    <div>
                        <Label className="mb-1 text-base font-medium">Pet Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Pet Name"
                            {...register("petName", {
                                required: "Pet name is required",
                            })}
                        />
                        {errors.petName && <AnimatedFormError message={errors.petName?.message}></AnimatedFormError>}
                    </div>


                    {/* Pet Picture */}
                    <div className="flex flex-col h-80">
                        <Label className="mb-2 md:text-lg">Pet Image</Label>

                        <Label
                            className="flex-1 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden"
                        >
                            {
                                imagePreview ?

                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />


                                    :
                                    <div className="text-center text-gray-400 flex flex-col items-center gap-2">
                                        <ImagePlus className="w-8 h-8 animate-pulse" />
                                        <span className="font-medium">Click to upload image</span>
                                    </div>
                            }
                            <Input
                                type="file"
                                accept="image/*"
                                ref={inputImageRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {/* hidden demo input to register with a name */}
                            <Input className="hidden" {...register("petPictureFile", {
                                required: "Please upload a pet picture"
                            })}></Input>

                        </Label>
                        {errors.petPictureFile && <AnimatedFormError message={errors.petPictureFile?.message}></AnimatedFormError>}


                    </div>
                    <div>
                        {
                            imagePreview &&
                            <div className="flex gap-2 mt-3">
                                <Button
                                    type="button"
                                    className="flex-1"
                                    onClick={() => inputImageRef.current.click()}
                                // onClick={clearImage}
                                >
                                    Change Image
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={clearImage}
                                >
                                    Clear Image
                                </Button>
                            </div>
                        }
                    </div>


                    <div className='flex flex-col md:flex-row gap-2'>
                        {/* Max Donation Amount */}
                        <div className="flex-1">
                            <Label className="mb-1 text-base font-medium">Max Donation Amount (USD)</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 10000"
                                min="0"
                                {...register("maxDonationAmount", {
                                    required: "Maximum donation amount is required",
                                    min: {
                                        value: 1,
                                        message: "Donation amount must be greater than 0"
                                    }
                                })}
                            />
                            {errors.maxDonationAmount && <AnimatedFormError message={errors.maxDonationAmount.message}></AnimatedFormError>}
                        </div>

                        {/* Last Date of Donation */}
                        <div className=" flex-1">

                            <DatePickerInput
                                label="Last Date of Donation"
                                name="donationDeadline"
                                onDateChange={(date) => handleDateChange(date)}
                                register={register}
                                errors={errors}
                                // dateResetTrigger={dateResetTrigger}
                                resetDate={resetDate}
                            />
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="">
                        <Label className="mb-1 text-base font-medium">Short Description</Label>
                        <Input
                            type="text"
                            placeholder="e.g. Help Bella the puppy get surgery"
                            {...register("shortDescription", {
                                required: "A short description is required",
                                maxLength: {
                                    value: 100,
                                    message: "Short description should not exceed 100 characters"
                                }
                            })}
                        />

                        {errors.shortDescription && <AnimatedFormError message={errors.shortDescription?.message}></AnimatedFormError>}

                    </div>

                    {/* Long Description */}
                    <LongDescriptionInput
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        longDescription={longDescription}
                        placeholder={"Describe the situation and why you're raising funds"}
                    />

                    {/* Submit Button */}
                    <div>
                        <Button type="submit" className="w-full text-base font-medium" disabled={isSubmitting}>
                            Create Campaign
                            {
                                isSubmitting && <TbLoader className='animate-spin' />
                            }
                        </Button>
                    </div>
                </form>


                <div className='hidden xl:flex'>
                    <Lottie animationData={helpSeekingAnimation} loop={false}></Lottie>
                </div>
            </div>
        </section>
    );
};

export default CreateCampaignPage;
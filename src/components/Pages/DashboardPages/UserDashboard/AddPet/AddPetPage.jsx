import React, { useRef, useState } from 'react';
import { Input } from "../../../../ui/input";
import { Textarea } from "../../../../ui/textarea";
import { Label } from "../../../../ui/label";
import { Button } from "../../../../ui/button";
import Select from "react-select";
import Lottie from 'lottie-react';

import happyCat from "../../../../../assets/LottieAnimations/Lovely cats.json"
import { ImagePlus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import useCloudinaryUpload from '../../../../../hooks/useCloudynariUpload';
import useAuth from '../../../../../hooks/useAuth';
import { TbLoader } from 'react-icons/tb';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { confirmAction, errorAlert, successAlert } from '../../../../../Utilities/sweetAlerts';
import LongDescriptionInput from '../../../../Shared/LongDescriptionInput/LongDescriptionInput';

const petCategories = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },
    { value: "Bird", label: "Bird" }, //extra? not shown in browse by catergory
    { value: "Other", label: "Other" },
];


const AddPetPage = () => {
    const { register, handleSubmit, watch, setValue, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            longDescription: '',
        },
    })
    const longDescription = watch('longDescription');

    const inputImageRef = useRef();
    const { user } = useAuth();
    const { uploadImage } = useCloudinaryUpload();
    const axiosSecure = useAxiosSecure();

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue("petImage", file, { shouldValidate: true });
        }
    };


    const clearImage = () => {
        setImagePreview(null);
        inputImageRef.current.value = "";
        setValue("petImage", null, { shouldValidate: true });
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onPetFormSubmit = async (data) => {
        const { petName, petAge, petCategory, petLocation, shortDescription, longDescription, petImage } = data; // petImage is a file
        

        confirmAction("Confirm Adoption Listing", "Are you sure you want to list this pet for adoption? You can edit it later if needed.", "Yes, list the pet")
            .then(async (result) => {

                try {
                    if (result.isConfirmed) {
                        setIsSubmitting(true);
                        const photoURL = await uploadImage(petImage);

                        const petInfo = {
                            petName,
                            petAge,
                            petCategory: petCategory.value,
                            petLocation,
                            shortDescription,
                            longDescription,
                            photoURL,
                            adoption_status: "not_adopted",
                            createdAt: new Date().toISOString(),
                            ownerEmail: user.email
                        };

                        await axiosSecure.post('/add-pet', petInfo)
                            .then(res => {
                                if (res.data.insertedId) {

                                    // success message
                                    successAlert("Pet Listed for Adoption!", res.data.message);

                                    // reseting all input fields
                                    reset({
                                        petName: '',
                                        petAge: '',
                                        petCategory: null,
                                        petLocation: '',
                                        shortDescription: '',
                                        longDescription: '',
                                        photoURL: null,
                                    });
                                    clearImage();
                                    setValue("petImage", null, { shouldValidate: false });
                                    setValue("longDescription", null, { shouldValidate: true });
                                }
                            })
                            .catch(error => {
                                errorAlert("Unable to List Pet", error.response.data.message);
                            })
                    }

                }
                catch (error) {
                    console.error(error);
                    errorAlert("Something Went Wrong", "Could not upload photo");
                }
                finally {
                    setIsSubmitting(false)
                };
            })

    }

    return (
        <section className="w-11/12 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Add a New Pet to adoption</h1>
            <div className='xl:grid xl:grid-cols-2'>
                <div>
                    <form className='space-y-6' onSubmit={handleSubmit(onPetFormSubmit)}>

                        <div className='grid md:grid-cols-2 gap-4'>
                            {/* Pet Name */}
                            <div className='space-y-2'>
                                <Label className="md:text-lg">Pet Name</Label>
                                <Input type="text" placeholder="Enter pet name" className="text-xs md:text-base lg:text-lg" {...register("petName", { required: "Pet Name is Required" })} />
                                {errors.petName && <p className="text-xs text-red-500">{errors.petName.message}</p>}
                            </div>
                            {/* Pet Location */}
                            <div className='space-y-2'>
                                <Label className="md:text-lg">Pet Location</Label>
                                <Input type="text" placeholder="Enter pickup location" className="text-xs md:text-base lg:text-lg" {...register("petLocation", { required: "Pet Location is Required" })} />
                                {errors.petLocation && <p className="text-xs text-red-500">{errors.petLocation.message}</p>}
                            </div>
                        </div>

                        <div className='grid lg:grid-cols-2 gap-4'>
                            <div className=' flex flex-col gap-4 justify-between'>
                                {/* Pet Age */}
                                <div className='space-y-2'>
                                    <Label className="md:text-lg">Pet Age</Label>
                                    <Input type="number" min="0" step="0.1" placeholder="e.g. 2.5 years" className="text-xs md:text-base lg:text-lg" {...register("petAge", { required: "Pet Age is Required" })} />
                                    {errors.petAge && <p className="text-xs text-red-500">{errors.petAge.message}</p>}
                                </div>

                                {/* Pet Category */}
                                <div className="space-y-2">
                                    <Label className="md:text-lg">Pet Category</Label>

                                    <Controller
                                        name="petCategory"

                                        control={control}
                                        rules={{ required: "Pet Category is Required" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={petCategories}
                                                className="text-xs md:text-base lg:text-lg"
                                                placeholder="Select pet category"
                                            />
                                        )}
                                    />

                                    {errors.petCategory && (
                                        <p className="text-xs text-red-500">{errors.petCategory.message}</p>
                                    )}
                                </div>
                                {/* Short Description */}
                                <div className='space-y-2'>
                                    <Label className="md:text-lg">Short Description</Label>
                                    <Textarea
                                        className="bg-white text-xs md:text-base lg:text-lg"
                                        placeholder="A small note or summary about the pet"

                                        {...register("shortDescription", { required: "Please enter short description about your pet" })}
                                    />

                                </div>
                                <div className={`${!errors.shortDescription ? "hidden" : ""}`}>
                                    {errors.shortDescription && <p className="text-xs text-red-500 mt-2">{errors.shortDescription.message}</p>}
                                </div>
                            </div>

                            <div className=" flex flex-col min-h-70">
                                <Label className="md:text-lg mb-2">Pet Image</Label>

                                <label
                                    className="flex-1 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden"
                                >
                                    {
                                        imagePreview ?

                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="object-cover"
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
                                    <Input className="hidden" {...register("petImage", { required: "Pet Image is Required" })}></Input>

                                </label>

                                {errors.petImage && <p className="text-xs text-red-500 text-center mt-2 lg:mt-4">{errors.petImage.message}</p>}

                                <div>
                                    {
                                        imagePreview && (
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
                                        )}
                                </div>
                            </div>


                        </div>


                        {/* Long Description (Tiptap WYSIWYG) */}
                        <LongDescriptionInput
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            longDescription={longDescription}
                        />

                        {/* Submit Button */}
                        <div>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                                {
                                    isSubmitting && <TbLoader className='animate-spin' />
                                }
                            </Button>
                        </div>
                    </form>

                    {/* <ImageCropper></ImageCropper> */}


                </div>
                <div className='flex items-center'>
                    <Lottie animationData={happyCat}
                        className='md:h-[50vh] lg:h-[70vh] flex-1 '
                    ></Lottie>
                </div>
            </div>
        </section>
    );
};

export default AddPetPage;
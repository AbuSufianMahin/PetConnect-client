import React, { useRef, useState } from 'react';
import { Input } from "../../../../ui/input";
import { Textarea } from "../../../../ui/textarea";
import { Label } from "../../../../ui/label";
import { Button } from "../../../../ui/button";
import Select from "react-select";
import LongDescriptionInput from './LongDescriptionInput';
import Lottie from 'lottie-react';

import happyCat from "../../../../../assets/LottieAnimations/Lovely cats.json"
import { ImagePlus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import useCloudinaryUpload from '../../../../../hooks/useCloudynariUpload';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../../../ui/dialog';
import Cropper from 'react-easy-crop';

import { Slider } from "../../../../ui/slider"

const petCategories = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },
    { value: "Bird", label: "Bird" }, //extra? not shown in browse by catergory
    { value: "Other", label: "Other" },
];


const AddPetPage = () => {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
    const inputImageRef = useRef();
    const { uploadImage } = useCloudinaryUpload();


    const [imagePreview, setImagePreview] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null); // raw file
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showCropModal, setShowCropModal] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));

            console.log(URL.createObjectURL(file))

        }
    };


    const clearImage = () => {
        setImagePreview(null);
        inputImageRef.current.value = "";
        setValue("petImage", null, { shouldValidate: true });
    }

    const onPetFormSubmit = (data) => {
        const petInfo = {
            petName: data.petName,
            petAge: data.petAge,
            petCategory: data.petCategory.value,
            petLocation: data.petLocation,
            shortDescription: data.shortDescription,
            longDescription: data.longDescription,
        };
    }




    return (
        <div className="w-11/12 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Add a New Pet to adoption</h1>
            <div className='xl:grid xl:grid-cols-2'>
                <div>
                    <form className='space-y-6' onSubmit={handleSubmit(onPetFormSubmit)}>

                        <div className='grid md:grid-cols-2 gap-4'>
                            {/* Pet Name */}
                            <div className='space-y-2'>
                                <Label className="text-lg">Pet Name</Label>
                                <Input type="text" placeholder="Enter pet name" {...register("petName", { required: "Pet Name is Required" })} />
                                {errors.petName && <p className="text-xs text-red-500">{errors.petName.message}</p>}
                            </div>
                            {/* Pet Location */}
                            <div className='space-y-2'>
                                <Label className="text-lg">Pet Location</Label>
                                <Input type="text" placeholder="Enter pickup location" {...register("petLocation", { required: "Pet Location is Required" })} />
                                {errors.petLocation && <p className="text-xs text-red-500">{errors.petLocation.message}</p>}
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                {/* Pet Age */}
                                <div className='space-y-2'>
                                    <Label className="text-lg">Pet Age</Label>
                                    <Input type="number" min="0" step="0.1" placeholder="e.g. 2.5 years" {...register("petAge", { required: "Pet Age is Required" })} />
                                    {errors.petAge && <p className="text-xs text-red-500">{errors.petAge.message}</p>}
                                </div>

                                {/* Pet Category */}
                                <div className="space-y-2">
                                    <Label className="text-lg">Pet Category</Label>

                                    <Controller
                                        name="petCategory"
                                        control={control}
                                        rules={{ required: "Pet Category is Required" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={petCategories}
                                                placeholder="Select pet category"
                                            />
                                        )}
                                    />

                                    {errors.petCategory && (
                                        <p className="text-xs text-red-500">{errors.petCategory.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col justify-between h-full">
                                <Label className="text-lg mb-2">Pet Image</Label>

                                <label
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
                                    <Input className="hidden" {...register("petImage", { required: "Pet Image is Required" })}></Input>

                                </label>
                                {errors.petImage && <p className="text-xs text-red-500 text-center">{errors.petImage.message}</p>}


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



                        {/* Short Description */}
                        <div className='space-y-2'>
                            <Label className="text-lg">Short Description</Label>
                            <Textarea
                                className="bg-white"
                                placeholder="A small note or summary about the pet"
                                {...register("shortDescription", { required: "Please enter short description about your pet" })}
                            />
                            {errors.shortDescription && <p className="text-xs text-red-500">{errors.shortDescription.message}</p>}
                        </div>

                        {/* Long Description (Tiptap WYSIWYG) */}
                        <LongDescriptionInput
                            register={register}
                            setValue={setValue}
                            errors={errors}></LongDescriptionInput>
                        {/* Submit Button */}
                        <div>
                            <Button type="submit">Submit</Button>
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
        </div>
    );
};

export default AddPetPage;
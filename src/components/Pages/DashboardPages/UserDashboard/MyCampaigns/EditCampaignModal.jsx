import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../../../ui/dialog";
import { Label } from '../../../../ui/label';
import { Button } from "../../../../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../../../../ui/input";
import { ImagePlus } from "lucide-react";
import LongDescriptionInput from "../../../../Shared/LongDescriptionInput/LongDescriptionInput";
import DatePickerInput from "../../../../Shared/DatePickerInput/DatePickerInput";
import AnimatedFormError from "../../../../Shared/AnimatedFormError/AnimatedFormError";

const EditCampaignModal = ({ openEditDialog, setOpenEditDialog, campaignDetails, refetch }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
            longDescription: '',
        },
    })

    const [longDescription, setLongDescription] = useState(campaignDetails?.longDescription || "");
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (campaignDetails) {
            const updatedData = {
                ...campaignDetails,
                donationDeadline: campaignDetails?.deadline ? new Date(campaignDetails.deadline) : null,
            };
            reset(updatedData);
            setImagePreview(campaignDetails.photoURL);
            setLongDescription(campaignDetails.longDescription);
        }
    }, [campaignDetails, reset, setValue]);

    const [resetDate, setResetDate] = useState(false);
    const handleDateChange = (date) => {
        const isoDate = date?.toISOString()
        setValue("deadline", isoDate, { shouldValidate: true })
    }

    const inputImageRef = useRef();

    const clearImage = () => {
        setImagePreview(null);
        inputImageRef.current.value = "";
        setValue("petPictureFile", null, { shouldValidate: true });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue("petPictureFile", file, { shouldValidate: true });
        }
    };


    const handleCloseDialog = () => {
        setImagePreview(campaignDetails.photoURL);
        reset(campaignDetails);
        setOpenEditDialog(false);
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleCampaignFormSubmit = (data) => {
        setResetDate(false);
        console.log(data);
    }

    return (
        <Dialog open={openEditDialog} onOpenChange={handleCloseDialog}>
            <DialogContent className="md:max-w-2xl lg:max-w-4xl gap-3 max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Donation Campaign</DialogTitle>
                    <DialogDescription>
                        Update the details of your donation campaign below.
                    </DialogDescription>
                </DialogHeader>


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
                                required: !imagePreview ? "Pet Image is Required" : false
                            })} />
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


                    <DialogFooter className="pt-4">
                        <Button variant="outline" type="button" onClick={handleCloseDialog}>
                            Cancel
                        </Button>
                        <Button type="submit" className="text-base font-medium" disabled={isSubmitting}>
                            save changes
                            {
                                isSubmitting && <TbLoader className='animate-spin' />
                            }
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCampaignModal;

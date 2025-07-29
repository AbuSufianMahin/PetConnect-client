import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../../ui/dialog';
import { Label } from '../../ui/label';
import Select from "react-select";
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { TbLoader } from 'react-icons/tb';
import { ImagePlus } from 'lucide-react';
import { Button } from '../../ui/button';
import { confirmAction, errorAlert, successAlert } from '../../../Utilities/sweetAlerts';
import useCloudinaryUpload from '../../../hooks/useCloudynariUpload';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LongDescriptionInput from '../LongDescriptionInput/LongDescriptionInput';
import useAuth from '../../../hooks/useAuth';


const petCategories = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },
    { value: "Bird", label: "Bird" }, //extra? not shown in browse by catergory
    { value: "Other", label: "Other" },
];

const PetEditDialogue = ({ openEditDialog, setOpenEditDialog, petDetails, refetch, userRole }) => {
    const { user } = useAuth();

    const { register, handleSubmit, setValue, control, formState: { errors }, reset } = useForm();
    const { uploadImage } = useCloudinaryUpload();
    const axiosSecure = useAxiosSecure();

    const [longDescription, setLongDescription] = useState(petDetails?.longDescription || "");
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (petDetails) {

            reset(petDetails); //setting all the default values! (with photoURL, which is not given in this edit dialogue)

            setImagePreview(petDetails.photoURL)
            setLongDescription(petDetails.longDescription);
        }
    }, [petDetails, reset, setValue]);

    const inputImageRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue("petImageFile", file, { shouldValidate: true });
        }
    };
    const clearImage = () => {
        setImagePreview(null);
        inputImageRef.current.value = "";
        setValue("petImageFile", null, { shouldValidate: true });

    }

    const handleCloseDialog = () => {
        setImagePreview(petDetails.photoURL);
        reset(petDetails);
        setOpenEditDialog(false);
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEditSubmit = async (data) => {

        const { photoURL, ...oldPetData } = petDetails;
        const { petImageFile, photoURL: previewPhotoURL, ...newPetData } = data;

        const isSameData = JSON.stringify(oldPetData) === JSON.stringify(newPetData);
        if (petImageFile === "" && isSameData) {
            setOpenEditDialog(false);
            confirmAction("No Changes Detected", "You haven't made any changes to update.", "Retry")
                .then((result) => {
                    if (result.isConfirmed) {
                        setOpenEditDialog(true);
                    }
                    else {
                        return;
                    }
                });
        }
        else {
            try {
                setIsSubmitting(true);

                const { petName, petAge, shortDescription, longDescription, petCategory, petLocation } = newPetData;

                let newPhotoURL = photoURL;

                if (petImageFile) {
                    newPhotoURL = await uploadImage(petImageFile);
                }

                // user can only change these value
                const newPetInfo = {
                    petName,
                    petAge,
                    petCategory: petCategory.value,
                    petLocation,
                    shortDescription,
                    longDescription,
                    photoURL: newPhotoURL,
                }
                
                const res = await axiosSecure.patch(`/pet/${petDetails._id}?email=${user.email}`, newPetInfo);

                if (res.status === 200) {
                    successAlert("Pet Updated!", "Your pet's information was successfully updated.")
                }
            }
            catch (error) {
                errorAlert("Update Failed", error.response?.data?.message || "Something went wrong. Please try again.")
            }
            finally {
                setOpenEditDialog(false);
                setIsSubmitting(false);
                refetch();
            }
        }
    }


    return (
        <>
            <Dialog open={openEditDialog} onOpenChange={handleCloseDialog}>
                <DialogContent className="bg-accent md:max-w-2xl lg:max-w-4xl xl:max-w-6xl gap-3 max-h-[95vh] overflow-y-auto">
                    <DialogHeader className="gap-0">
                        <DialogTitle className="text-lg md:text-xl font-semibold">
                            Edit Pet
                        </DialogTitle>
                        <DialogDescription>
                            Update the information about your pet.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4" onSubmit={handleSubmit(handleEditSubmit)}>
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Pet Name */}
                            <div className="space-y-2">
                                <Label className="md:text-lg">Pet Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter pet name"
                                    className="text-xs md:text-base lg:text-lg"
                                    {...register("petName", { required: "Pet Name is Required" })}
                                />
                                {errors.petName && <p className="text-xs text-red-500">{errors.petName.message}</p>}
                            </div>
                            {/* Pet Location */}
                            <div className="space-y-2">
                                <Label className="md:text-lg">Pet Location</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter pickup location"
                                    className="text-xs md:text-base lg:text-lg"
                                    {...register("petLocation", { required: "Pet Location is Required" })}
                                />
                                {errors.petLocation && <p className="text-xs text-red-500">{errors.petLocation.message}</p>}
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4 justify-between">
                                {/* Pet Age */}
                                <div className="space-y-2">
                                    <Label className="md:text-lg">Pet Age</Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.1"
                                        placeholder="e.g. 2.5 years"
                                        className="text-xs md:text-base lg:text-lg"
                                        {...register("petAge", { required: "Pet Age is Required" })}
                                    />
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
                                                value={petCategories.find(option => option.value === field.value)} //manually setting the default value
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
                                <div className="space-y-2">
                                    <Label className="md:text-lg">Short Description</Label>
                                    <Textarea
                                        className="bg-white text-xs md:text-base lg:text-lg"
                                        placeholder="A small note or summary about the pet"
                                        {...register("shortDescription", {
                                            required: "Please enter short description about your pet",
                                        })}
                                    />
                                </div>
                                {errors.shortDescription && (
                                    <p className="text-xs text-red-500 mt-2">{errors.shortDescription.message}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col min-h-70">
                                <Label className="md:text-lg mb-2">Pet Image</Label>
                                <label className="flex-1 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden">

                                    {
                                        imagePreview ?
                                            <img src={imagePreview} alt="Preview" className="object-cover w-full max-h-60" />
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
                                    <Input className="hidden" {...register("petImageFile", {
                                        required: !imagePreview ? "Pet Image is Required" : false
                                    })} />
                                </label>

                                {errors.petImageFile && (
                                    <p className="text-xs text-red-500 text-center mt-2 lg:mt-4">
                                        {errors.petImageFile.message}
                                    </p>
                                )}

                                {imagePreview && (
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            type="button"
                                            className="flex-1"
                                            onClick={() => inputImageRef.current.click()}
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

                        {/* Long Description (WYSIWYG Editor) */}
                        <LongDescriptionInput
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            longDescription={longDescription}
                            setLongDescription={setLongDescription}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                Save Changes
                                {isSubmitting && <TbLoader className="animate-spin" />}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PetEditDialogue;
import { MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { SelectLabel } from '../../../ui/select';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { errorToast } from '../../../../Utilities/toastAlerts';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import { TbLoader } from 'react-icons/tb';

const PetCard = ({ pet, user, refetch }) => {

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const [openDialog, setOpenDialogue] = useState(false);
    const handleAdoptionModalOpen = () => {
        if (!user) {
            errorToast("You need to login to request for adoption!", 2000);
            return;
        }
        setOpenDialogue(true);
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAoptionRequest = async (data) => {
        setIsSubmitting(true);
        setOpenDialogue(false);
        const { contactNumber, address } = data;

        const requesterInfo = {
            adoption_status: "requested",
            requesterName: user.displayName,
            requesterEmail: user.email,
            requesterContactNumber: contactNumber,
            requesterAddress: address
        }


        try {
            const res = await axiosSecure.patch(`/pets/${pet._id}/request-adoption`, requesterInfo);
            console.log(res);
            successAlert("Adoption Request Submitted", "Your request to adopt this pet has been submitted successfully.")
            reset();
            refetch();

        } catch (error) {
            errorAlert("Failed to send adoption request:", error.message);
        }
        finally {
            setIsSubmitting(false);
        }
    };




    return (
        <div key={pet._id} className='flex flex-col justify-between bg-white border-2 shadow-md hover:shadow-xl transition-shadow duration-300  rounded-2xl overflow-hidden'>
            <div className="relative backdrop-blur-lg  dark:bg-gray-900/60 border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Image */}
                <div className="relative">
                    <img
                        src={pet.photoURL}
                        alt={pet.petName}
                        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/70 dark:bg-gray-800/70 text-xs font-medium px-3 py-1 rounded-full shadow">
                        {pet.petCategory}
                    </div>
                </div>

                {/* Content */}
                <div className="py-3 px-2 -mt-15 z-1 bg-white rounded-t-[100%] text-center">
                    <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-1 hover:text-primary hover:scale-105 font-delius-regular">
                        <Link to={`/pet-details/${pet._id}`}>
                            {pet.petName}
                        </Link>
                    </h2>

                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-bold">Age:</span> {pet.petAge} years
                        </p>

                        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300 gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-bold tracking-wide" >{pet.petLocation}</span>
                        </div>
                        <p className='bordertext-sm line-clamp-1'>
                            {pet.shortDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className='pb-5 px-10 lg:px-20 bg-white'>
                <div className='flex flex-wrap gap-3'>
                    <Link to={`/pet-details/${pet._id}`} className='flex-1'>
                        <Button className="w-full text-xs md:text-sm">View Details</Button>
                    </Link>

                    {
                        pet.ownerEmail !== user?.email &&
                        <Button className="flex-1 text-xs md:text-sm" variant={"outline"} onClick={handleAdoptionModalOpen}>Request Adoption</Button>
                    }

                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={() => setOpenDialogue(false)}>
                <DialogContent className="md:max-w-2xl xl:max-w-3xl gap-3">
                    <DialogHeader className="gap-0">
                        <DialogTitle className="text-lg md:text-xl font-semibold">
                            Adopt {pet.petName}
                        </DialogTitle>
                        <DialogDescription>
                            Fill out your details to request adoption.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4" onSubmit={handleSubmit(handleAoptionRequest)}>
                        <div className='space-y-1'>
                            <Label>Your Name</Label>
                            <Input value={user?.displayName} readOnly />
                            <p className="text-xs text-yellow-600">This is your account name and cannot be changed.</p>

                        </div>

                        <div className='space-y-1'>
                            <Label>Your Email</Label>
                            <Input value={user?.email} readOnly />
                            <p className="text-xs text-yellow-600">This is your account email and cannot be changed.</p>
                        </div>

                        <div className='space-y-1'>
                            <Label>Phone Number</Label>
                            <Input
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register("contactNumber", { required: "Address is required" })}
                            />
                            {errors.contactNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.contactNumber.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <Label>Address</Label>
                            <Input
                                placeholder="Enter your address"
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address.message}</p>}
                        </div>

                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit Request
                                {
                                    isSubmitting && <TbLoader className='animate-spin' />
                                }
                            </Button>
                        </DialogFooter>

                    </form>

                </DialogContent>
            </Dialog>
        </div >
    );
};

export default PetCard;
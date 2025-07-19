import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { errorAlert, successAlert } from '../../../Utilities/sweetAlerts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { TbLoader } from 'react-icons/tb';

const PetAdoptionRequestDialogue = ({user, pet, openAdoptDialog, setOpenAdoptDialog, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAoptionRequest = async (data) => {
        setIsSubmitting(true);
        setOpenAdoptDialog(false);
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
        <>
            <Dialog open={openAdoptDialog} onOpenChange={() => setOpenAdoptDialog(false)}>
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
        </>
    );
};

export default PetAdoptionRequestDialogue;
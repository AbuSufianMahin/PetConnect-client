import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import DOMPurify from "dompurify";
import { Separator } from '../../../ui/separator';
import { ArrowLeft, BadgeCheck, CalendarIcon, MapPinIcon, PawPrintIcon, UserRound } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import PetDetailsSkeleton from './PetDetailsSkeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

import PetAdoptionRequestDialogue from '../../../Shared/PetDialogues/PetAdoptionRequestDialogue';
import PetEditDialogue from '../../../Shared/PetDialogues/PetEditDialogue';
import { warningToast } from '../../../../Utilities/toastAlerts';


const PetDetails = () => {
    const { user } = useAuth();
    const { petId } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: petDetails = {}, isLoading, refetch } = useQuery({
        queryKey: ["pet-details", petId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pet-details?petId=${petId}`);
            return res.data;
        }
    })
    const { petName, petAge, petCategory, petLocation, shortDescription, longDescription, photoURL, adoption_status, createdAt, ownerEmail } = petDetails;

    const [openAdoptDialog, setOpenAdoptDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleAdoption = () => {
        if(user){
            setOpenAdoptDialog(true)
        }
        else{
            warningToast("You need to login first!", 2000)
        }
    }

    return (
        <div className="w-11/12 md:w-10/12 mx-auto mt-6 mb-12">
            <Link
                to={-1} // navigates back in history
                className="ml-5 inline-flex items-center gap-2 font-bold duration-200 mb-5 hover:underline cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" strokeWidth={3} />
                Go back
            </Link>
            {
                isLoading ?
                    <PetDetailsSkeleton />
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center rounded-3xl overflow-hidden bg-white shadow-lg border">
                        {/* Image */}
                        <div className=" overflow-hidden shadow-sm bg-muted/20 h-full">
                            <img
                                src={photoURL}
                                alt={petName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2 justify-between h-full p-4 md:px-16 md:py-10 lg:p-10">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-extrabold tracking-tight font-delius-regular">{petName}</h1>
                                {
                                    adoption_status === "adopted" ?
                                        <Badge variant={"outline"}
                                            className="rounded-3xl px-2 py-1 text-sm bg-red-300 text-red-700 border-0"
                                        >
                                            Adopted
                                        </Badge>
                                        :
                                        adoption_status === "requested" ?
                                            <Badge className="rounded-3xl px-2 py-1 text-sm bg-yellow-200 text-yellow-800">
                                                Requested
                                            </Badge>
                                            :
                                            <Badge
                                                variant="secondary"
                                                className="rounded-3xl px-2 py-1 bg-primary text-sm text-white dark:bg-blue-600 flex items-center gap-1"
                                            >
                                                <div className='flex gap-1 items-center'>
                                                    <BadgeCheck className="w-4 h-4" strokeWidth={2} />
                                                    <span>Available</span>
                                                </div>
                                            </Badge>
                                }

                            </div>

                            <p className="text-muted-foreground">{shortDescription}</p>

                            <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <PawPrintIcon className="w-4 h-4" />
                                    <span>Category:</span>
                                    <span className="text-foreground">{petCategory}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span>Age:</span>
                                    <span className="text-foreground">{petAge} years</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>Location:</span>
                                    <span className="text-foreground">{petLocation}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>Listed:</span>
                                    <span className="text-foreground">
                                        {new Date(createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <UserRound className="w-4 h-4" />
                                    <span>Owner email:</span>
                                    <span className="text-foreground">{ownerEmail}</span>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h2 className="text-xl font-bold mb-2 text-center">About {petName}</h2>

                                <div
                                    className="rich-text-content prose prose-neutral max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(longDescription),
                                    }}
                                />
                            </div>


                            <div className='flex gap-2 flex-wrap'>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex-2">
                                            <Button
                                                size="lg"
                                                className="w-full text-base tracking-wide"
                                                disabled={ownerEmail === user?.email || adoption_status !== "not_adopted"}
                                                onClick={handleAdoption}
                                            >
                                                Adopt Now
                                            </Button>
                                        </div>
                                    </TooltipTrigger>
                                    {
                                        ownerEmail === user?.email ?
                                            <TooltipContent
                                                side="bottom"
                                                className="text-sm text-white text-center"
                                            >
                                                You cannot adopt your own pet listing.
                                            </TooltipContent>
                                            :
                                            adoption_status === "requested" ?
                                                <TooltipContent
                                                    side="bottom"
                                                    className="text-sm text-white text-center"
                                                >
                                                    This pet is already requested for adoption.
                                                </TooltipContent>
                                                :
                                                <TooltipContent
                                                    side="bottom"
                                                    className="text-sm text-white text-center"
                                                >
                                                    This pet is already adopted.
                                                </TooltipContent>
                                    }
                                </Tooltip>

                                <Tooltip>


                                    {
                                        ownerEmail === user?.email &&
                                        <TooltipTrigger asChild>
                                            <div className='flex-1 flex gap-2'>
                                                <Button size="lg" variant={"outline"}
                                                    className="flex-1 text-base"
                                                    disabled={adoption_status === "adopted"}
                                                    onClick={() => setOpenEditDialog(true)}>
                                                    Edit
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                    }

                                    {
                                        adoption_status === "adopted" &&
                                        <TooltipContent
                                            side="bottom"
                                            className="text-sm text-white text-center"
                                        >
                                            You can not edit an adopted Pet!
                                        </TooltipContent>
                                    }

                                </Tooltip>
                            </div>
                        </div>
                    </div>
            }

            <PetAdoptionRequestDialogue
                user={user}
                pet={petDetails}
                openAdoptDialog={openAdoptDialog}
                setOpenAdoptDialog={setOpenAdoptDialog}
                refetch={refetch}
            />

            <PetEditDialogue
                petDetails={petDetails}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
                refetch={refetch}
            />
        </div>
    );
};

export default PetDetails;
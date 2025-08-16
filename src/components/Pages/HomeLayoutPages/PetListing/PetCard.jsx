import { MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../../ui/button';

import { errorToast } from '../../../../Utilities/toastAlerts';

import PetRequestDialogue from '../../../Shared/PetDialogues/PetAdoptionRequestDialogue';

const PetCard = ({ pet, user, refetch }) => {

    const [openAdoptDialog, setOpenAdoptDialog] = useState(false);
    const handleAdoptionModalOpen = () => {
        if (!user) {
            errorToast("You need to login to request for adoption!", 2000);
            return;
        }
        setOpenAdoptDialog(true);
    }


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
                <div className="pt-3 pb-5 px-10 -mt-15 z-1 bg-white rounded-t-[100%] text-center">
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

            <div className='pb-5 px-5 bg-white'>
                <div className='flex flex-wrap gap-3'>
                    <Link to={`/pet-details/${pet._id}`} className='flex-1'>
                        <Button className="w-full px-4 py-2 rounded-xl font-semibold text-sm bg-primary transition dark:text-white shadow-sm">
                            View Details
                        </Button>
                    </Link>

                    {
                        pet.ownerEmail === user?.email ?
                        <Button className="flex-1 text-xs md:text-sm border-3" variant={"outline"} disabled={pet.ownerEmail === user?.email}>Your Pet</Button>
                        :
                        <Button className="flex-1 text-xs md:text-sm" variant={"outline"} onClick={handleAdoptionModalOpen}>Request adoption</Button>
                    }

                </div>
            </div>

            <PetRequestDialogue
                user={user}
                pet={pet}
                openAdoptDialog={openAdoptDialog} 
                setOpenAdoptDialog={setOpenAdoptDialog}
                refetch={refetch}
            />

        </div >
    );
};

export default PetCard;
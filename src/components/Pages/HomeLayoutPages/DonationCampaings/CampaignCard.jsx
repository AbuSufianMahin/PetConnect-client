import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { NavLink } from 'react-router';

const CampaignCard = ({ campaign }) => {
    const { _id, petName, photoURL, maxDonationAmount, donatedAmount, shortDescription } = campaign;
    const progressAmount = (donatedAmount / maxDonationAmount) * 100;

    return (
        <div className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-neutral-800 group transition-transform duration-300 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">

            {/* Image Header */}
            <div className="relative min-h-36 md:h-72 overflow-hidden">
                <img
                    src={photoURL}
                    alt={petName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

                {/* Bottom Text */}
                <div className="absolute bottom-3 left-4 z-20 text-white drop-shadow-xl">
                    <h3 className="text-2xl font-bold font-delius-regular">{petName}</h3>
                    <p className="text-sm italic text-gray-300">{shortDescription}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-5 space-y-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg">

                {/* Target and Donated */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Target</span>
                        <span className="text-lg font-semibold">${maxDonationAmount.toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">Donated</span>
                        <span className="text-lg font-semibold text-green-600">${donatedAmount.toLocaleString()}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full mb-0 h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <Progress value={progressAmount} className="h-3 bg-gray-200 dark:bg-gray-700" />
                </div>
                <span className='text-sm ml-1'>{Math.round(progressAmount)}% funded</span>

                {/* Action Button */}
                <div className="pt-4">
                    <NavLink to={`/campaign-details/${_id}`}>
                        <Button className="w-full px-4 py-2 rounded-xl font-semibold text-sm bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 hover:brightness-105 transition text-zinc-800 dark:text-white shadow-sm">
                            View Details
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>


    );
};

export default CampaignCard;
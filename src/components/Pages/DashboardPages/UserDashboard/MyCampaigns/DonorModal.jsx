import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../../ui/dialog';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../ui/avatar';
import Skeleton from 'react-loading-skeleton';

const DonorModal = ({ user, openDonorDialog, setOpenDonorDialog, selectedCampaign: campaign }) => {
    const axiosSecure = useAxiosSecure();
    const { data: donorData = [], isLoading } = useQuery({
        queryKey: ["donors"],
        enabled: !!campaign && openDonorDialog,
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaign-donors/${campaign?._id}?email=${user?.email}`);
            return res.data;
        }
    })

    const handleCloseDialog = () => {
        setOpenDonorDialog(false);
    }
    return (
        <Dialog open={openDonorDialog} onOpenChange={handleCloseDialog}>
            <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Donors for: {campaign?.petName}</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        These kind individuals have contributed to this cause.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    {isLoading ?
                        [...Array(2)].map((_, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 border rounded-xl p-3 shadow-sm bg-white"
                            >
                                {/* Avatar */}
                                <div className="h-12 w-12 rounded-full overflow-hidden">
                                    <Skeleton circle width={48} height={48} />
                                </div>

                                {/* Name + Email */}
                                <div className="flex-1">
                                    <Skeleton width={100} height={14} style={{ marginBottom: 6 }} />
                                    <Skeleton width={160} height={12} />
                                </div>

                                {/* Amount */}
                                <div className="text-right">
                                    <Skeleton width={60} height={16} />
                                </div>
                            </div>
                        ))
                        :
                        donorData.length === 0 ?
                            <p className="text-sm text-muted-foreground">No donors yet.</p>
                            :
                            donorData.map((donor, i) => (
                                <div key={donor.email || i} className="flex items-center gap-4 border rounded-xl p-3 shadow-sm">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={donor.usersPhotoURL} alt={donor.name} />
                                        <AvatarFallback>{donor.name?.[0] || "?"}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium">{donor.name || "Anonymous"}</p>
                                        <p className="text-xs text-muted-foreground">{donor.email}</p>
                                    </div>
                                    <div className="text-sm font-semibold text-green-600">${donor.totalAmount}</div>
                                </div>

                            ))
                    }
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default DonorModal;
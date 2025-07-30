import React, { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../ui/table';
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, Pause, Pencil, Play, Users } from 'lucide-react';
import { Progress } from '../../../../ui/progress';
import { Button } from '../../../../ui/button';
import { TbLoader } from 'react-icons/tb';
import { errorAlert } from '../../../../../Utilities/sweetAlerts';
import { successToast } from '../../../../../Utilities/toastAlerts';
import { Link } from 'react-router';
import EditCampaignModal from './EditCampaignModal';
import DonorModal from './DonorModal';
import MyCampaignSkeleton from './MyCampaignSkeleton';

const MyCampaignsPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: campaignsData = [], isLoading, refetch } = useQuery({
        queryKey: ["my-campaigns", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-campaigns?email=${user.email}`);
            return res.data;
        },
    });

    const [isPausing, setIsPausing] = useState(false);
    const [pauseCampaignId, setPauseCampaignId] = useState();

    const onPauseToggle = async (campaignId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "paused" : "active";
        setIsPausing(true);
        setPauseCampaignId(campaignId);
        try {
            const response = await axiosSecure.patch(`/donation-campaigns/${campaignId}/toggle-status`, { status: newStatus });

            if (response.data.success) {
                successToast(response.data.message, 3000);
            }
        }
        catch (error) {
            errorAlert("Status update failed", error.message);
        }
        finally {
            setIsPausing(false);
            refetch();
        }
    }

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCampaignForEdit, setSelectedCampaignForEdit] = useState(null);

    const handleEdit = (campaign) => {
        setOpenEditDialog(true);
        setSelectedCampaignForEdit(campaign)
    }

    const [openDonorDialog, setOpenDonorDialog] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const onViewDonators = (campaign) => {
        setOpenDonorDialog(true);
        setSelectedCampaign(campaign);
    }

    const [sorting, setSorting] = useState([])
    const columns = [
        {
            header: "SL",
            accessorFn: (_, index) => index + 1,
            cell: (info) => info.getValue(),
        },
        {
            header: "Pet Name",
            accessorKey: "petName",
            cell: (info) => {
                const petName = info.getValue();
                const campaignId = info.row.original._id;
                return (

                    <Link to={`/campaign-details/${campaignId}`}>
                        <span className="text-lg font-bold hover:text-primary font-delius-regular">
                            {petName}
                        </span>
                    </Link>

                );
            },
        },
        {
            header: "Max Donation",
            accessorKey: "maxDonationAmount",
            cell: (info) => `$${info.getValue()}`,
        },
        {
            header: "Progress",
            accessorKey: "donatedAmount",
            cell: (info) => {
                const donated = info.getValue();
                const max = info.row.original.maxDonationAmount;
                const percentage = Math.min((donated / max) * 100, 100);

                return (
                    <div className="flex flex-col gap-1 w-44 mx-auto">
                        <Progress value={percentage} className="h-3 rounded" />
                        <span className="text-xs text-center text-gray-600">
                            ${donated} of ${max}
                        </span>
                    </div>
                );
            },
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (info) => {
                const status = info.getValue();
                const baseClasses = "inline-block px-3 py-1 rounded-full text-sm font-semibold";
                let bgClass = "";
                let textClass = "";

                switch (status) {
                    case "active":
                        bgClass = "bg-green-100";
                        textClass = "text-green-700";
                        break;
                    case "paused":
                        bgClass = "bg-yellow-100";
                        textClass = "text-yellow-700";
                        break;
                    case "completed":
                        bgClass = "bg-blue-100";
                        textClass = "text-blue-700";
                        break;
                    default:
                        bgClass = "bg-gray-100";
                        textClass = "text-gray-700";
                        break;
                }

                return <span className={`${baseClasses} ${bgClass} ${textClass}`}>{status}</span>;
            },
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const campaign = row.original;
                return (
                    <div className="flex flex-col items-center gap-2">
                        {campaign.status !== "completed" && (
                            <Button
                                variant="outline"
                                className="w-40 flex items-center justify-center gap-2"
                                onClick={() => onPauseToggle(campaign._id, campaign.status)}
                                disabled={isPausing && campaign._id === pauseCampaignId}
                            >
                                {campaign.status === "active" ? (
                                    <Pause className="h-4 w-4" />
                                ) : (
                                    <Play className="h-4 w-4" />
                                )}
                                {campaign.status === "active" ? "Pause" : "Unpause"}
                                {isPausing && campaign._id === pauseCampaignId && (
                                    <TbLoader className="animate-spin" />
                                )}
                            </Button>
                        )}

                        <Button
                            className="w-40 flex items-center justify-center gap-2"
                            onClick={() => handleEdit(campaign)}
                        >
                            <Pencil className="h-4 w-4" />
                            Edit
                        </Button>

                        <Button
                            variant="secondary"
                            className="w-40 flex text-white items-center justify-center gap-2"
                            onClick={() => onViewDonators(campaign)}
                        >
                            <Users className="h-4 w-4" />
                            View Donators
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: campaignsData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <section className="w-11/12 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Your Added Donation Campaigns</h1>

            <Table className="rounded-xl overflow-hidden">
                <TableHeader className="bg-secondary">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer select-none text-white text-center p-4">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && (
                                        <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                {
                    isLoading ?
                        // <TableBody>
                        //     <TableRow>
                        //         <TableCell colSpan={6} className="text-center py-6 text-gray-500 italic bg-white">
                        //             Loading
                        //         </TableCell>
                        //     </TableRow>
                        // </TableBody>
                        <MyCampaignSkeleton count={3} />
                        :
                        <>
                            {
                                campaignsData.length === 0 ?
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6 text-gray-500 italic bg-white">
                                                No Campaings found
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    :
                                    < TableBody >
                                        {
                                            table.getRowModel().rows.map(row => (
                                                <TableRow key={row.id} className="bg-white">
                                                    {row.getVisibleCells().map((cell, index) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className={`text-center md:p-6 ${index === 0 ? 'md:min-w-[60px]' : 'md:min-w-32'}`}
                                                        >
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                            }
                        </>
                }
            </Table >

            <EditCampaignModal
                isLoading={isLoading}
                campaignDetails={selectedCampaignForEdit}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
                refetch={refetch}
            />

            <DonorModal
                user={user}
                selectedCampaign={selectedCampaign}
                openDonorDialog={openDonorDialog}
                setOpenDonorDialog={setOpenDonorDialog}
            />

        </section>
    );
};

export default MyCampaignsPage;
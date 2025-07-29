import { useQuery } from "@tanstack/react-query";
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../../ui/button";
import { confirmAction, errorAlert, successAlert } from "../../../../../Utilities/sweetAlerts";
import DonationLoadingSkeleton from "./DonationLoadingSkeleton";

const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: donations = [], isLoading, refetch } = useQuery({
        queryKey: ["myDonations", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/user?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });


    const handleRefund = (campaignId, transactionId) => {
        confirmAction("Confirm Refund?", "Are you sure you want to refund this donation?", "Yes, Refund")
            .then(async (result) => {
                if (result.isConfirmed) {

                    try {
                        const response = await axiosSecure.post(`/refund-donation?email=${user.email}`, {
                            campaignId,
                            transactionId,
                        });

                        if (response.data.success) {
                            successAlert("Refund Operation Successful", "Donation amount has been refunded properly.");
                            // TODO: refresh your data here, e.g. refetch campaign or donations list
                        } else {
                            errorAlert("Refund failed: " + (response.data.message || "Unknown error"));
                        }
                    }
                    catch (error) {
                        errorAlert(("Refund failed: " + (error.response?.data?.message || error.message)));
                    }
                    finally {
                        refetch();
                    }
                }
            })
    }


    const [sorting, setSorting] = useState([]);
    const columns = [
        {
            header: "SL",
            accessorFn: (_, index) => index + 1,
            cell: (info) => info.getValue(),
        },
        {
            header: "Pet Image",
            accessorKey: "photoURL",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="Pet"
                    className="w-20 h-20 rounded-xl object-cover mx-auto"
                />
            ),
        },
        {
            header: "Pet Name",
            accessorKey: "petName",
            cell: (info) => {
                const petName = info.getValue();
                const campaignId = info.row.original.campaignId;
                return (
                    <Link to={`/campaign-details/${campaignId}`}>
                        <span className="text-base font-semibold hover:text-primary">{petName}</span>
                    </Link>
                );
            },
        },
        {
            header: "Donated Amount",
            accessorKey: "donatedAmount",
            cell: (info) => `$${info.getValue()}`,
        },
        {
            header: "Donated At",
            accessorKey: "donatedAt",
            cell: (info) => {
                const dateObj = new Date(info.getValue());
                const dateStr = dateObj.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });

                const timeStr = dateObj.toLocaleTimeString();

                return (
                    <div className="px-4 py-2 whitespace-nowrap">
                        <span className="font-medium">{dateStr}</span>
                        <br />
                        <span className="text-gray-500 text-xs">{timeStr}</span>
                    </div>
                );
            },
        },
        {
            header: "Action",
            cell: (info) => {
                const { campaignId, transactionId } = info.row.original;
                return (
                    <Button
                        onClick={() => handleRefund(campaignId, transactionId)}
                        className="mx-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-red-500 via-rose-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:brightness-90 transition-all duration-300"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Ask For Refund
                    </Button>
                )
            },
        }
    ];

    const table = useReactTable({
        data: donations, // your fetched donations
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <section className="w-11/12 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Your Donations Log</h1>

            <Table className="rounded-xl overflow-hidden">
                <TableHeader className="bg-secondary">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none text-white text-center p-4"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && (
                                        <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {isLoading ?
                        <DonationLoadingSkeleton />
                        :
                        donations.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 bg-white text-gray-500 italic">
                                    No donations found.
                                </TableCell>
                            </TableRow>
                            :
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="bg-white">
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`text-center md:p-6 ${index === 0 ? "md:min-w-[60px]" : "md:min-w-32"}`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </section>

    );
};

export default MyDonations;
import React, { useState } from 'react';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../ui/table';
import { confirmAction, errorAlert, successAlert } from '../../../../../Utilities/sweetAlerts';
import { ArrowUpDown, XCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../../../../ui/button';
import { TbLoader } from 'react-icons/tb';
import { Badge } from '../../../../ui/badge';
import NoPetFound from '../../../../Shared/NoPetsFound/NoPetFound';
import SentReqTableSkeleton from './SentReqTableSkeleton';


const SentRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: outgoingPetRequests = [], isLoading, refetch } = useQuery({
        queryKey: ["sent-requests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet-requests/outgoing?email=${user.email}`);
            return res.data;
        }
    });

    const [isCanceling, setIsCanceling] = useState(false);
    const [cancelPetId, setCancelPetId] = useState(null);

    const handleCancelRequest = (pet) => {

        confirmAction("Cancel Adoption Request?", "Are you sure you want to cancel this adoption request? This action cannot be undone.", "Yes, Cancel Request")
            .then(async (result) => {
                if (result.isConfirmed) {
                    setIsCanceling(true);
                    setCancelPetId(pet._id);

                    try {
                        const response = await axiosSecure.patch(`/adoptions/cancel/${pet._id}`);

                        if (response.data.success) {
                            successAlert("Request canceled", response.data.message)
                        }
                    }
                    catch (error) {
                        errorAlert("Failed to reject", error.response?.data?.message || "Try again later.");
                    }
                    finally {
                        setIsCanceling(false);
                        setCancelPetId(null);
                        refetch();
                    }
                }
            })
    }

    const [sorting, setSorting] = useState([])
    const columns = [
        {
            header: 'SL',
            accessorFn: (_, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: 'Pet Name',
            accessorKey: 'petName',
            cell: info => {
                const petName = info.getValue()
                const petId = info.row.original._id;
                const petCategory = info.row.original.petCategory;

                return (

                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Link to={`/pet-details/${petId}`}>
                            <span className='text-lg font-bold hover:text-primary font-delius-regular'>{petName}</span>
                        </Link>
                        <Badge variant={"outline"} className="bg-white/70 dark:bg-gray-800/70 text-xs font-medium px-3 py-1 rounded-full shadow">
                            {petCategory}
                        </Badge>
                    </div>

                )
            }
        },
        {
            header: 'Image',
            accessorKey: 'photoURL',
            cell: info => {
                const value = info.getValue()
                const petId = info.row.original._id;

                return (
                    <div className='flex justify-center w-full'>
                        <Link to={`/pet-details/${petId}`}>
                            <img src={value} alt="pet image"
                                className="w-16 h-16 md:w-20 md:h-20 xl:h-24 xl:w-24 rounded-md object-cover shadow-lg" />
                        </Link>
                    </div>
                )
            }
        },
        {
            header: 'Adoption Status',
            accessorKey: 'adoption_status',
            cell: info => {
                const status = info.getValue()
                let label = ''
                let baseClasses = 'inline-block px-3 py-1 rounded-full text-sm font-semibold'
                let bgClass = ''
                let textClass = ''

                switch (status) {
                    case 'adopted':
                        label = 'Approved'
                        bgClass = 'bg-green-100'
                        textClass = 'text-green-700'
                        break
                    case 'requested':
                        label = 'Requested'
                        bgClass = 'bg-blue-100'
                        textClass = 'text-blue-700'
                        break
                }

                return (
                    <span className={`${baseClasses} ${bgClass} ${textClass}`}>
                        {label}
                    </span>
                )
            }
        },
        {
            header: 'Timestamps',
            accessorFn: row => ({ requested_at: row.requested_at, adopted_at: row.adopted_at, created_at: row.created_at }),
            cell: (info) => {
                const { requested_at, adopted_at } = info.getValue();

                const renderDateTime = (value, fallbackText) => {
                    const date = value ? new Date(value) : null;
                    return date ?
                        <div className='flex flex-col'>
                            <span className="text-gray-800 font-medium">
                                {date.toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                            <span className="text-gray-500 text-xs">
                                {date.toLocaleTimeString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </span>
                        </div>
                        :
                        <span className="italic text-gray-400 text-sm">{fallbackText}</span>

                };

                return (
                    <div className="flex flex-col gap-4 text-sm font-sans">
                        <div>
                            <span className={`block text-xs font-semibold ${requested_at ? "text-blue-600" : "text-gray-400"} mb-1`}>Requested At:</span>
                            <div className="text-gray-800 font-medium">
                                {renderDateTime(requested_at, "Not requested yet")}
                            </div>
                        </div>
                        <div>
                            <span className={`block text-xs font-semibold text-gray-400 ${adopted_at ? "text-green-500" : "text-gray-400"} mb-1`}>Adopted At:</span>
                            <div className="text-gray-800 font-medium">
                                {renderDateTime(adopted_at, "Not adopted yet")}
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            header: 'Owner',
            accessorKey: 'requesterDetails',
            cell: info => {
                const pet = info.row.original;
                const requester = info.getValue()
                if (!requester) {
                    return <span className="italic text-gray-400 text-sm">-</span>
                }

                return (
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">{pet.ownerEmail}</span>
                        </div>

                        {
                            pet.adoption_status === "requested" &&
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer w-32 mx-auto text-xs font-bold flex items-center justify-center gap-1 border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                                onClick={() => handleCancelRequest(pet)}
                                disabled={isCanceling}
                            >
                                {
                                    isCanceling && pet._id === cancelPetId ?
                                        <TbLoader className="h-4 w-4 animate-spin" />
                                        :
                                        <XCircle className="h-4 w-4" />
                                }
                                Cancel Request
                            </Button>
                        }
                    </div>
                )
            }
        },
    ]

    const table = useReactTable({
        data: outgoingPetRequests,
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
        <section className='w-11/12 mx-auto py-10'>
            <div className='flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8'>
                <h1 className="text-3xl font-bold">
                    Sent Pet Requests
                </h1>
                <div>
                    {
                        table.getPageCount() > 1 && (
                            <div className="hidden md:flex items-center justify-between gap-10 pt-4">
                                <div>
                                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>

            <div>
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
                            <SentReqTableSkeleton rows={3}></SentReqTableSkeleton>
                            :

                            <>
                                {
                                    outgoingPetRequests.length === 0 ?
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-6 text-gray-500 italic bg-white">
                                                    No Pets Found
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
                                                                className={`text-center md:p-6 ${index === 0 ? 'md:min-w-20' : 'md:min-w-32'}`}
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

                </Table>

                {table.getPageCount() > 1 && (
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

        </section>

    );
};

export default SentRequests;
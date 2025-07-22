import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import "react-loading-skeleton/dist/skeleton.css";

import { Button } from '../../../../ui/button';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../ui/table';
import { ArrowUpDown, CheckCircle, Pencil, Trash2 } from 'lucide-react';
import PetEditDialogue from '../../../../Shared/PetDialogues/PetEditDialogue';
import { Link } from 'react-router';
import NoAddedPets from './NoAddedPets';
import { confirmAction } from '../../../../../Utilities/sweetAlerts';


const MyPetsPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myAddedPetsData = [], isLoading, refetch } = useQuery({
        queryKey: ["my-added-pets", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-pets?email=${user.email}`);
            return res.data;
        }
    });


    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedPetForEdit, setSelectedPetForEdit] = useState(null);

    const [sorting, setSorting] = useState([])

    const handleDelete = (pet) => {
        confirmAction("Are you sure?", "The pet's data will be deleted permanently. This cannot be undone.", "Confirm Deletion")
            .then(result => {
                if (result.isConfirmed) {
                    console.log("hiii")
                }
            })
    }


    const handleEditDialog = (pet) => {
        setSelectedPetForEdit(pet);
        setOpenEditDialog(true);
    }
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
                const value = info.getValue()
                const petId = info.row.original._id;

                return (
                    <Link to={`/pet-details/${petId}`}>
                        <span className='text-lg font-bold hover:text-primary font-delius-regular'>{value}</span>
                    </Link>
                )
            }
        },
        {
            header: 'Category',
            accessorKey: 'petCategory',
            cell: info => info.getValue(),
        },
        {
            header: 'Image',
            accessorKey: 'photoURL',
            cell: info => {
                const value = info.getValue()
                const petId = info.row.original._id;

                return (
                    <div className='flex justify-center'>
                        <Link to={`/pet-details/${petId}`}>
                            <img src={value} alt="pet image" className="h-20 w-20 rounded-xl object-cover shadow-lg" />
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
                let className = ''

                switch (status) {
                    case 'adopted':
                        label = 'Adopted'
                        className = 'text-green-600 font-semibold'
                        break
                    case 'requested':
                        label = 'Requested'
                        className = 'text-blue-600 font-semibold'
                        break
                    case 'not_adopted':
                    default:
                        label = 'Not Adopted'
                        className = 'text-yellow-600 font-semibold'
                        break
                }

                return <span className={`${className}`}>{label}</span>
            }
        },
        // {
        //     header: 'Requested At',
        //     accessorKey: 'requested_at',
        //     cell: (info) => {
        //         const value = info.getValue();
        //         const date = value ? new Date(value) : null;
        //         return date ?
        //             <div className="flex flex-col text-sm">
        //                 <span className="text-gray-800 font-medium">
        //                     {
        //                         date.toLocaleDateString('en-GB', {
        //                             weekday: 'short',
        //                             year: 'numeric',
        //                             month: 'short',
        //                             day: 'numeric',
        //                         })
        //                     }
        //                 </span>
        //                 <span className="text-gray-500 text-xs">
        //                     {
        //                         date.toLocaleTimeString('en-GB', {
        //                             hour: '2-digit',
        //                             minute: '2-digit',
        //                             hour12: true
        //                         })
        //                     }
        //                 </span>
        //             </div>
        //             :
        //             <span className="italic text-gray-400 text-sm">Not requested yet</span>

        //     }
        // },
        // {
        //     header: 'Adopted At',
        //     accessorKey: 'adopted_at',
        //     cell: (info) => {
        //         const value = info.getValue();
        //         const date = value ? new Date(value) : null;

        //         return date ?
        //             <div className="flex flex-col text-sm">
        //                 <span className="text-gray-800 font-medium">
        //                     {
        //                         date.toLocaleDateString('en-GB', {
        //                             weekday: 'short',
        //                             year: 'numeric',
        //                             month: 'short',
        //                             day: 'numeric',
        //                         })
        //                     }
        //                 </span>
        //                 <span className="text-gray-500 text-xs">
        //                     {
        //                         date.toLocaleTimeString('en-GB', {
        //                             hour: '2-digit',
        //                             minute: '2-digit',
        //                             hour12: true
        //                         })
        //                     }
        //                 </span>
        //             </div>
        //             :
        //             <span className="italic text-gray-400 text-sm">Not adopted yet</span>

        //     }

        // },
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
            header: 'Requested By',
            accessorKey: 'requesterDetails',
            cell: info => {
                const requester = info.getValue()

                if (!requester) {
                    return <span className="italic text-gray-400 text-sm">-</span>
                }

                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{requester.name}</span>
                        <span className="text-xs text-gray-500">{requester.email}</span>
                    </div>
                )
            }
        },
        {
            header: 'Actions',
            cell: ({ row }) => {
                const pet = row.original
                // console.log(pet);
                return (
                    <>
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" onClick={() => handleEditDialog(pet)}>
                                <Pencil className="h-4 w-4 mr-1" /> Update
                            </Button>

                            <Button variant="outline">
                                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />Mark Adopted
                            </Button>

                            <Button variant="destructive" className="flex items-center px-3 hover:bg-red-700" onClick={() => handleDelete(pet)}>
                                <Trash2 />Delete
                            </Button>



                        </div>
                    </>
                )
            }
        },
    ]

    const table = useReactTable({
        data: myAddedPetsData,
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
        <div className='w-11/12 mx-auto py-10'>
            <div className='flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8'>
                <h1 className="text-3xl font-bold">
                    Your Listed Pets
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

            {/* <NoAddedPets></NoAddedPets> */}

            {
                isLoading ?
                    <>LOADINGGG</>
                    :
                    <>
                        {
                            myAddedPetsData.length === 0 ?
                                <NoAddedPets></NoAddedPets>
                                :
                                <>
                                    <div className="rounded-xl overflow-hidden">
                                        <Table>
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
                                            <TableBody>
                                                {table.getRowModel().rows.map(row => (
                                                    <TableRow key={row.id} className="bg-white">
                                                        {row.getVisibleCells().map(cell => (
                                                            <TableCell key={cell.id} className="text-center p-6">
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

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
                                </>
                        }
                    </>


            }

            <PetEditDialogue
                isLoading={isLoading}
                petDetails={selectedPetForEdit}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
                refetch={refetch}
            />
        </div>
    );
};

export default MyPetsPage;
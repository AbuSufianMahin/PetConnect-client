import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import "react-loading-skeleton/dist/skeleton.css";

import { Button } from '../../../../ui/button';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../ui/table';
import { confirmAction, errorAlert, successAlert } from '../../../../../Utilities/sweetAlerts';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

import PetEditDialogue from '../../../../Shared/PetDialogues/PetEditDialogue';
import { Link } from 'react-router';
import { TbLoader } from 'react-icons/tb';
import PetsLoadingSkeleton from './PetsLoadingSkeleton';


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

    const [isDeleting, setIsDeleting] = useState(false);
    const [deletePetId, setDeletePetId] = useState(null);


    const handleDelete = (pet) => {
        setDeletePetId(pet._id);
        confirmAction("Are you sure?", "The pet's data will be deleted permanently. This cannot be undone.", "Confirm Deletion")
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        setIsDeleting(true);
                        const res = await axiosSecure.delete(`/pets/${pet._id}`);

                        if (res.data.deletedCount) {
                            successAlert("Deleted!", "The pet has been deleted successfully.");
                            refetch();
                        }
                    }
                    catch (error) {
                        errorAlert(error.response.data.message, "Failed to delete the pet. Please try again.");

                    }
                    finally {
                        setIsDeleting(false);
                    }
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
            cell: info => {
                const category = info.getValue();
                return (
                    <span className="inline-block px-3 py-1 shadow-sm text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                        {category}
                    </span>
                );

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
                                className="w-16 h-16 md:w-20 md:h-20 xl:h-24 xl:w-24 rounded-md object-cover shadow-md" />
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
                        label = 'Adopted'
                        bgClass = 'bg-green-100'
                        textClass = 'text-green-700'
                        break
                    case 'requested':
                        label = 'Requested'
                        bgClass = 'bg-blue-100'
                        textClass = 'text-blue-700'
                        break
                    case 'not_adopted':
                    default:
                        label = 'Not Adopted'
                        bgClass = 'bg-yellow-100'
                        textClass = 'text-yellow-700'
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
            header: 'Actions',
            cell: ({ row }) => {
                const pet = row.original
                return (
                    <>
                        {
                            pet.adoption_status === "adopted" ?
                                <span className="inline-block px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                                    No action available
                                </span>

                                :
                                <div className="flex flex-col items-center gap-2">
                                    <Button
                                        variant="outline"
                                        className="w-40 flex items-center justify-center gap-2"
                                        onClick={() => handleEditDialog(pet)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Update Pet
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        className="w-40 flex items-center justify-center gap-2 disabled:opacity-50"
                                        onClick={() => handleDelete(pet)}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete Pet
                                        {isDeleting && pet._id === deletePetId && (
                                            <TbLoader className="h-4 w-4 animate-spin ml-1" />
                                        )}
                                    </Button>
                                </div>
                        }


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
                        <PetsLoadingSkeleton rows={3}></PetsLoadingSkeleton>
                        :
                        <>
                            {
                                myAddedPetsData.length === 0 ?
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

            {
                table.getPageCount() > 1 && (
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
                )
            }


            < PetEditDialogue
                isLoading={isLoading}
                petDetails={selectedPetForEdit}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
                refetch={refetch}
            />
        </div >
    );
};

export default MyPetsPage;
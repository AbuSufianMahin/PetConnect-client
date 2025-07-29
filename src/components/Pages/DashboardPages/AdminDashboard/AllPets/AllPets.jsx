import { motion } from "framer-motion";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";
import { Input } from "../../../../ui/input";
import { Separator } from "../../../../ui/separator";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../../ui/button";
import { NavLink } from "react-router";
import useDebounce from "../../../../../hooks/useDebounce";
import AllPetsLoadingSkeleton from "./AllPetsLoadingSkeleton";
import { confirmAction, errorAlert, successAlert } from "../../../../../Utilities/sweetAlerts";
import { TbLoader } from "react-icons/tb";
import { errorToast, successToast } from "../../../../../Utilities/toastAlerts";
import PetEditDialogue from "../../../../Shared/PetDialogues/PetEditDialogue";


const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.05 } },
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};


const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user: admin } = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchValue = useDebounce(searchTerm, 500);


    const { data: petsInfo = [], isLoading, refetch } = useQuery({
        queryKey: ["All-pets", debouncedSearchValue],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-pets?seachByName=${debouncedSearchValue}&email=${admin.email}`);
            return res.data;

        }
    })

    const [deleteId, setDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);


    const handleDelete = (petId) => {
        confirmAction("Are you sure?", "Are you sure you want to delete this pet? This action cannot be undone.")
            .then(async (result) => {
                if (result.isConfirmed) {
                    setDeleteId(petId);
                    setIsDeleting(true);
                    try {
                        const res = await axiosSecure.delete(`/admin/pets/${petId}?email=${admin.email}`);
                        if (res.status === 200) {
                            successAlert("", "Pet deleted successfully");
                        }
                    } catch (error) {
                        errorAlert("Error deleting pet", error.message || "Unknown error");
                    }
                    finally {
                        setDeleteId(null);
                        setIsDeleting(false);
                        refetch();
                    }
                }
            })

    }

    const handleStatusUpdate = async (petId, currentStatus) => {
        let newStatus = null;
        let newStatusLabel = null;

        if (currentStatus === "requested" || currentStatus === "adopted") {
            newStatus = "not_adopted";
            newStatusLabel = "not adopted"
        } else {
            // From not_adopted (or any other), mark as adopted
            newStatus = "adopted";
            newStatusLabel = "adopted"
        }

        try {
            const res = await axiosSecure.patch(`/admin/pets/${petId}/status?email=${admin.email}`, {
                adoption_status: newStatus,
            });

            if (res.status === 200) {
                successToast(`Status updated to "${newStatusLabel}"`);
                // updatePetsState(petId, newStatus);
            }
        } catch (error) {
            errorToast("Failed to update status", error.message || "Unknown error");
        }
        finally {
            refetch()
        }
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedPetForEdit, setSelectedPetForEdit] = useState(null);

    const handleEditDialog = (pet) => {
        setSelectedPetForEdit(pet);
        setOpenEditDialog(true);
    }

    const columns = [
        {
            header: "SL",
            accessorFn: (_, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: "Photo",
            accessorKey: "photoURL",
            cell: info => (
                <img src={info.getValue()} alt="pet" className="w-24 h-24 rounded-md object-cover mx-auto border" />
            ),
        },
        {
            header: "Name",
            accessorKey: "petName",
            cell: info => {
                const petName = info.getValue();
                const petId = info.row.original._id;
                return (
                    <NavLink to={`/pet-details/${petId}`}>
                        <p className="text-lg font-bold font-delius-regular hover:text-primary hover:scale-105">{petName}</p>
                    </NavLink>
                )
            }
        },
        {
            header: "Category",
            accessorKey: "petCategory",
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
            header: "Added By",
            accessorKey: "ownerEmail",
        },
        {
            header: "Adoption Status",
            accessorKey: "adoption_status",
            cell: info => {
                const status = info.getValue();

                let statusLabel, statusClass;
                switch (status) {
                    case "adopted":
                        statusLabel = "Adopted";
                        statusClass = "text-green-600 bg-green-100";
                        break;
                    case "not_adopted":
                        statusLabel = "Not Adopted";
                        statusClass = "text-orange-500 bg-orange-100";
                        break;
                    case "requested":
                        statusLabel = "Requested";
                        statusClass = "text-blue-600 bg-blue-100";
                        break;
                }

                return (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${statusClass}`}>
                        {statusLabel}
                    </span>
                );
            }
        },
        {
            header: "Added At",
            accessorKey: "createdAt",
            cell: info => {
                const value = info.getValue();
                return (
                    <span className="inline-flex flex-col p-3 bg-gray-100 rounded-md shadow-sm text-center">
                        <span>
                            {new Date(value).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                        <Separator className={"my-1"}></Separator>
                        <span>
                            {new Date(value).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </span>
                    </span>
                );
            },
        },
        {
            header: "Actions",
            cell: info => {
                const { _id, adoption_status } = info.row.original;

                return (
                    <div className="flex flex-col gap-3 items-center">
                        {/* Update Button */}
                        <Button
                            size="sm"
                            className="w-40 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                            onClick={() => handleEditDialog(info.row.original)}
                        >
                            <Pencil className="w-4 h-4 mr-1" />
                            Edit
                        </Button>

                        {/* Adoption Toggle Button */}
                        <Button
                            size="sm"
                            className={`w-40 px-5 py-2.5 font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg 
                                ${adoption_status === "adopted"
                                    ? "bg-gray-800 text-white hover:bg-gray-900 shadow-sm"
                                    : "bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm"
                                }`}
                            onClick={() => handleStatusUpdate(_id, adoption_status)}
                        >
                            {adoption_status === "adopted" ? "Mark Not Adopted" : "Mark Adopted"}
                        </Button>

                        {/* Delete Button */}
                        <Button
                            size="sm"
                            className="w-40 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                            onClick={() => handleDelete(_id)}
                            disabled={deleteId === _id}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                            {
                                isDeleting && deleteId === _id && <TbLoader className='animate-spin' />
                            }
                        </Button>
                    </div>
                );
            },
        },
    ];
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: petsInfo,
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
            <motion.div
                className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold">All Listed Pets</h1>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <Input
                        type="text"
                        placeholder="Search pet by name"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </motion.div>

            <motion.div
                className="overflow-x-auto border rounded-lg"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <Table>
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <TableHead
                                        key={index}
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

                    {
                        isLoading ?
                            <AllPetsLoadingSkeleton rows={3} />
                            :
                            petsInfo.length === 0 ?
                                <tr className="bg-white">
                                    <td colSpan={8} className="text-center text-lg py-6 text-gray-500 italic">
                                        No pets found
                                    </td>
                                </tr>
                                :
                                <TableBody>
                                    {table.getRowModel().rows.map((row, idx) => (
                                        <motion.tr
                                            key={idx}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"} text-center`}
                                        >
                                            {row.getVisibleCells().map((cell, index) => (
                                                <TableCell key={index} className="text-center md:p-6 md:min-w-32">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </motion.tr>
                                    ))}
                                </TableBody>
                    }
                </Table>
            </motion.div>


            <PetEditDialogue
                isLoading={isLoading}
                petDetails={selectedPetForEdit}
                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}
                refetch={refetch}
                userRole="admin"
            />
        </section>
    );
};

export default AllPets;
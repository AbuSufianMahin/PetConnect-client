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
    const { user } = useAuth();

    const { data: petsInfo = [], isLoading } = useQuery({
        queryKey: ["All-pets"],
        queryFn: async () => {
            const res = await axiosSecure.get('/pets');
            return res.data.pets;
            // return res.data; ==> for infinity loading (will implement later)
        }
    })

    console.log(petsInfo);

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
                const pet = info.row.original;
                return (
                    <div className="flex flex-col gap-3 items-center">
                        {/* Update Button */}
                        <Button
                            size="sm"
                            className="w-40 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Update
                        </Button>

                        {/* Adoption Toggle Button */}
                        <Button
                            size="sm"
                            className={`w-40 px-5 py-2.5 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${pet.adopted
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
                                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                                }`}
                        >
                            {pet.adopted ? "Mark Not Adopted" : "Mark Adopted"}
                        </Button>

                        {/* Delete Button */}
                        <Button
                            size="sm"
                            className="w-40 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
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
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold">All Listed Pets</h1>
                <div className="w-1/4">
                    <Input
                        type="text"
                        placeholder="Search pet by name/category"
                    // onChange={(e) => setSearchValue(e.target.value)}
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
                            // <PetTableSkeleton rows={4} />
                            <p>LOADING</p>
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
        </section>
    );
};

export default AllPets;
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";
import UserTableSkeleton from "./UserTableSkeleton";
import { useState } from "react";
import useDebounce from "../../../../../hooks/useDebounce";
import { confirmAction, errorAlert, successAlert } from "../../../../../Utilities/sweetAlerts";
import useAuth from "../../../../../hooks/useAuth";
import { GiBrokenShield } from "react-icons/gi";
import { FaUserShield } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";
import { Separator } from "../../../../ui/separator";

const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.05 } },
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { user: admin } = useAuth();

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);

    const { data: usersInfo = [], isLoading, refetch } = useQuery({
        queryKey: ["All-users", debouncedSearchValue],
        queryFn: async () => {
            const res = await axiosSecure.get(`/search-users?searchValue=${debouncedSearchValue}&email=${admin.email}`);
            return res.data;
        }
    })



    const handleRoleChange = (user, role) => {
        const confirmBtnText = role === 'admin' ? "Make Admin" : "Remove Admin"
        confirmAction("Promote to admin?", "Are you sure you want to grant admin access to this user?", confirmBtnText)
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await axiosSecure.patch(`/users/update-role?email=${user.email}&role=${role}`, { adminEmail: admin.email });
                        if (res.data.modifiedCount) {
                            if (role == "admin") {
                                successAlert("User promoted to admin successfully.");
                            }
                            else {
                                successAlert("Removed admin");
                            }
                        }
                        else {
                            errorAlert("Failed to promote user.")
                        }
                    }
                    catch (error) {
                        errorAlert("An error occurred.", error);
                    }
                    finally {
                        refetch();
                    }
                }
            })
    }

    const columns = [
        {
            header: 'SL',
            accessorFn: (_, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: 'Profile',
            accessorKey: 'photoURL',
            cell: info => {
                const value = info.getValue()
                const userName = info.row.original.name;

                return (

                    <img
                        src={value}
                        alt={userName}
                        className="w-16 h-16 mx-auto rounded-full object-cover border-3 border-accent"
                        referrerPolicy="no-referrer"
                    />

                )
            }
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: info => {
                const value = info.getValue()

                return (
                    <span>{value}</span>
                )
            }
        },
        {
            header: 'email',
            accessorKey: 'email',
            cell: info => info.getValue(),
        },
        {
            header: 'Role',
            accessorKey: 'role',
            cell: info => {
                const value = info.getValue()

                return (
                    <>
                        {
                            value === 'admin' ?
                                <span className="text-green-600 font-medium text-sm p-2 rounded-full bg-green-100">Admin</span>
                                :
                                <span className="font-medium text-sm">User</span>
                        }
                    </>
                )
            }
        },
        {
            header: 'Role Update By',
            accessorKey: 'role_updated_by',
            cell: info => {
                const value = info.getValue();

                return (
                    <>
                        {value === "default" ? 'System' : value}
                    </>
                )
            }
        },
        {
            header: 'Role Updated At',
            accessorKey: "role_updated_at",
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
                )

            }
        },
        {
            header: "Action",
            accessorKey: "role",
            cell: info => {
                const role = info.getValue();
                const user = info.row.original;

                return (
                    <>
                        {role !== "admin" ? (
                            <Button
                                onClick={() => handleRoleChange(user, "admin")}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-lg hover:from-green-700 hover:to-emerald-600 transition-all duration-200"
                            >
                                <FaUserShield />
                                Make Admin
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleRoleChange(user, "user")}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-red-700 hover:to-rose-600 transition-all duration-200"
                                disabled={user.email === admin.email}
                            >
                                <GiBrokenShield />
                                Remove Admin
                            </Button>
                        )}
                    </>
                )

            }
        }
    ]
    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data: usersInfo,
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
                transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold">
                    Registered Users
                </h1>
                <div className="w-full md:w-1/2 xl:w-1/3">
                    <Input type="text" placeholder="Search User by Name or Email" onChange={(e) => setSearchValue(e.target.value)} />
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
                                    <TableHead key={index} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer select-none text-white text-center p-4">
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
                            <UserTableSkeleton rows={4}></UserTableSkeleton>
                            :
                            <>
                                {

                                    usersInfo.length === 0 ?
                                        <tr className="bg-white">
                                            <td colSpan={8} className="text-center text-lg py-6 text-gray-500 italic">
                                                No User Found
                                            </td>
                                        </tr>
                                        :
                                        < TableBody >
                                            {
                                                table.getRowModel().rows.map((row, idx) => (
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
                                                ))
                                            }
                                        </TableBody>
                                }

                            </>

                    }
                </Table>

            </motion.div>

        </section >
    );
};

export default Users;

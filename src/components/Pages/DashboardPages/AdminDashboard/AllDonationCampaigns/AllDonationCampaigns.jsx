import { motion } from "framer-motion";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";
import { Separator } from "../../../../ui/separator";
import { confirmAction, errorAlert, successAlert } from "../../../../../Utilities/sweetAlerts";
import { errorToast, successToast } from "../../../../../Utilities/toastAlerts";
import { useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import useDebounce from "../../../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../../../../ui/input";
import { ArrowUpDown, Pause, PauseCircle, Pencil, Play, PlayCircle, Trash2 } from "lucide-react";
import { Button } from "../../../../ui/button";
import { NavLink } from "react-router";
import { Progress } from "../../../../ui/progress";
import { TbLoader } from "react-icons/tb";
import AllPetsLoadingSkeleton from "./AllPetsLoadingSkeleton";

const AllDonationCampaigns = () => {

    const axiosSecure = useAxiosSecure();
    const { user: admin } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchValue = useDebounce(searchTerm, 500);

    const { data: campaigns = [], isLoading, refetch } = useQuery({
        queryKey: ["all-campaigns", debouncedSearchValue],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/all-donation-campaigns?search=${debouncedSearchValue}&email=${admin.email}`);
            return res.data;
        },
    });

    const [deleteId, setDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const handleEditDialog = (campaign) => {
        setSelectedCampaign(campaign);
        setOpenEditDialog(true);
    };

    const handleDelete = (id) => {
        confirmAction("Are you sure?", "Deleting a campaign is permanent.")
            .then(async (result) => {
                if (result.isConfirmed) {
                    setDeleteId(id);
                    setIsDeleting(true);
                    try {
                        const res = await axiosSecure.delete(`/admin/donation-campaigns/${id}?email=${admin.email}`);
                        if (res.status === 200) {
                            successAlert("Deleted", "Campaign deleted successfully.");
                            refetch();
                        }
                    } catch (error) {
                        errorAlert("Delete failed", error.message || "Something went wrong.");
                    } finally {
                        setDeleteId(null);
                        setIsDeleting(false);
                        refetch();
                    }
                }
            });
    };

    const [isPausing, setIsPausing] = useState(false);
    const [pauseCampaignId, setPauseCampaignId] = useState();

    const handlePauseToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === "paused" ? "active" : "paused";
        try {
            setPauseCampaignId(id);
            setIsPausing(true);
            const res = await axiosSecure.patch(`/admin/donation-campaigns/${id}/pause-toggle?email=${admin.email}`, { status: newStatus });
            if (res.status === 200) {
                successToast(`Campaign ${newStatus === "paused" ? "paused" : "resumed"}`);
                refetch();
            }
        } catch (error) {
            console.log(error)
            errorToast("Failed to update campaign status");
        }
        finally {
            setPauseCampaignId(null);
            setIsPausing(false);
        }
    };

    console.log(campaigns)

    const columns = [
        {
            header: "SL",
            accessorFn: (_, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: "Name",
            accessorKey: "petName",
            cell: info => {
                const petName = info.getValue();
                const petId = info.row.original._id;
                return (
                    <NavLink to={`/campaign-details/${petId}`}>
                        <p className="text-lg font-bold font-delius-regular hover:text-primary hover:scale-105">{petName}</p>
                    </NavLink>
                )
            }
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
            cell: info => {
                const status = info.getValue();
                return (
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${status === "paused" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: info => {
                const value = info.getValue();
                return (
                    <span className="inline-flex flex-col p-3 bg-gray-100 rounded-md text-center shadow-sm">
                        <span>{new Date(value).toLocaleDateString()}</span>
                        <Separator className="my-1" />
                        <span>{new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                );
            }
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
                                className="w-36 flex items-center rounded-xl justify-center gap-2"
                                onClick={() => handlePauseToggle(campaign._id, campaign.status)}
                                disabled={campaign._id === pauseCampaignId}
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
                            className="w-36 flex items-center rounded-xl justify-center gap-2"
                            onClick={() => handleEdit(campaign)}
                        >
                            <Pencil className="h-4 w-4" />
                            Edit
                        </Button>

                        <Button
                            size="sm"
                            className="w-36 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:brightness-90"
                            onClick={() => handleDelete(campaign._id)}
                            disabled={deleteId === campaign._id}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                            {isDeleting && deleteId === campaign._id && (
                                <TbLoader className="animate-spin ml-1" />
                            )}
                        </Button>
                    </div>
                );
            },
        }

    ];

    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: campaigns,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        <section className="w-11/12 mx-auto py-10">
            <motion.div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold">All Donation Campaigns</h1>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <Input
                        type="text"
                        placeholder="Search campaigns"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </motion.div>

            <motion.div
                className="overflow-x-auto border rounded-lg"
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
            >
                <Table>
                    <TableHeader className="bg-secondary">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer select-none text-white text-center p-4"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanSort() && <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {
                        isLoading ?
                            <AllPetsLoadingSkeleton count={3} />

                            :
                            campaigns.length === 0 ?
                                <tr className="bg-white">
                                    <td colSpan={6} className="text-center text-lg py-6 text-gray-500 italic">
                                        No donation campaigns found
                                    </td>
                                </tr>
                                :
                                <TableBody>
                                    {table.getRowModel().rows.map((row, idx) => (
                                        <motion.tr
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
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

            {/* <CampaignEditDialogue
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                campaign={selectedCampaign}
                refetch={refetch}
            /> */}
        </section>
    );
};

export default AllDonationCampaigns;
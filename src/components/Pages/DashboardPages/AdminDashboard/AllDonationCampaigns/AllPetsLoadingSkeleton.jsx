// AllPetsLoadingSkeleton.jsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableBody, TableCell, TableRow } from "../../../../ui/table";

const AllPetsLoadingSkeleton = ({ count = 6 }) => {
    return (
        <TableBody>
            {[...Array(count)].map((_, idx) => (
                <TableRow key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"} text-center`}>
                    {/* SL */}
                    <TableCell >
                        <Skeleton width={24} height={20} />
                    </TableCell>

                    {/* Name */}
                    <TableCell>
                        <Skeleton width={100} height={24} className="rounded" />
                    </TableCell>

                    {/* Progress */}
                    <TableCell>
                        <div className="flex flex-col mx-auto gap-1 w-44">
                            <Skeleton height={12} borderRadius={6} />
                            <Skeleton width={`80%`} height={12} />
                        </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                        <Skeleton width={72} height={24} borderRadius={999} />
                    </TableCell>

                    {/* Created At */}
                    <TableCell>
                        <div className="inline-flex flex-col p-2 rounded-md w-[7rem]">
                            <Skeleton height={16} width={`100%`} />
                            <Skeleton height={1} width={`100%`} className="my-1" />
                            <Skeleton height={16} width={`80%`} />
                        </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton height={36} width={144} borderRadius={12} />
                            <Skeleton height={36} width={144} borderRadius={12} />
                            <Skeleton height={32} width={144} borderRadius={12} />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default AllPetsLoadingSkeleton;

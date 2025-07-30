import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableBody, TableCell, TableRow } from '../../../../ui/table';

const MyCampaignSkeleton = ({ count = 3 }) => {
    return (
        <TableBody>
            {[...Array(count)].map((_, i) => (
                <TableRow key={i} className="bg-white">
                    {/* SL */}
                    <TableCell className="text-center md:min-w-[60px] py-4 px-3">
                        <Skeleton width={20} height={20} />
                    </TableCell>

                    {/* Pet Name */}
                    <TableCell className="text-center md:min-w-32 py-4 px-3">
                        <Skeleton width={i % 2 === 0 ? 120 : 80} height={20} />
                    </TableCell>

                    {/* Max Donation */}
                    <TableCell className="text-center md:min-w-32 py-4 px-3">
                        <Skeleton width={i % 2 === 0 ? 90 : 70} height={20} />
                    </TableCell>

                    {/* Progress */}
                    <TableCell className="text-center md:min-w-32 py-4 px-3">
                        <Skeleton width={200} height={16} borderRadius={9999} />
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center md:min-w-32 py-4 px-3">
                        <Skeleton
                            width={60}
                            height={24}
                            borderRadius={9999}
                        />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-center md:min-w-32 py-4 px-3">
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton width={150} height={36} style={{ marginBottom: 8 }} />
                            <Skeleton width={150} height={36} style={{ marginBottom: 8 }} />
                            <Skeleton width={150} height={36} />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MyCampaignSkeleton;
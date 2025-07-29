
import { TableCell, TableRow } from '../../../../ui/table';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const DonationLoadingSkeleton = () => {
    return (

        [...Array(3)].map((_, idx) => (
            <TableRow key={idx} className="bg-white">
                {/* SL */}
                <TableCell className="text-center md:p-6 md:min-w-[60px]">
                    <Skeleton width={30} height={20} />
                </TableCell>

                {/* Pet Image */}
                <TableCell className="text-center md:p-6 md:min-w-32">
                    <Skeleton height={80} width={80} borderRadius={12} />
                </TableCell>

                {/* Pet Name (Link style) */}
                <TableCell className="text-center md:p-6 md:min-w-32">
                    <Skeleton width={`60%`} height={20} />
                </TableCell>

                {/* Donated Amount */}
                <TableCell className="text-center md:p-6 md:min-w-32">
                    <Skeleton width={50} height={20} />
                </TableCell>

                {/* Donated At */}
                <TableCell className="text-center md:p-6 md:min-w-32">
                    <div className="space-y-1">
                        <Skeleton width={100} height={16} />
                        <Skeleton width={70} height={12} />
                    </div>
                </TableCell>

                {/* Action (Refund Button) */}
                <TableCell className="text-center md:p-6 md:min-w-32">
                    <Skeleton width={150} height={36} borderRadius={12} />
                </TableCell>
            </TableRow>
        ))


    );
};

export default DonationLoadingSkeleton;
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { TableBody, TableCell, TableRow } from '../../../../ui/table';

const ReceivedReqTableSkeleton = ({ rows }) => {
    return (
        <TableBody>
            {[...Array(rows)].map((_, index) => (
                <TableRow key={index} className="bg-white">

                    {/* SL */}
                    <TableCell className="text-center md:p-6 w-30">
                        <Skeleton width={20} height={20} />
                    </TableCell>

                    {/* Pet Name */}
                    <TableCell className="text-center md:p-6">

                        <Skeleton width={index % 2 === 0 ? 80 : 70} borderRadius={20} height={20} />
                        <Skeleton width={40} borderRadius={30} height={20} />

                    </TableCell>

                    {/* Image */}
                    <TableCell className="text-center md:p-6">
                        <Skeleton height={70} width={70} borderRadius={12} />
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center md:p-6">
                        <Skeleton width={index % 2 === 0 ? 90 : 70} height={24} borderRadius={12} />
                    </TableCell>

                    {/* timeStamp */}
                    <TableCell className="text-center space-y-1 min-w-30">
                        <div>
                            <Skeleton width={70} height={14} />
                            <Skeleton width={120} height={14} />
                            <Skeleton width={50} height={14} />
                        </div>
                        <div>
                            <Skeleton width={70} height={14} />
                            <Skeleton width={120} height={14} />
                            <Skeleton width={50} height={14} />
                        </div>
                    </TableCell>

                    {/* owner */}
                    <TableCell className="text-center min-w-64 grid gap-1">
                        <Skeleton width={80} height={16} />
                        <Skeleton width={100} height={16} />
                        <Skeleton width={150} height={16} />
                        <Skeleton width={100} height={16} />
                    </TableCell>
                </TableRow>
            ))}

        </TableBody>
    );
};

export default ReceivedReqTableSkeleton;
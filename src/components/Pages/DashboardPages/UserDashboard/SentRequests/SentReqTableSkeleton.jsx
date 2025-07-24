import React from 'react';

import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { TableBody, TableCell, TableRow } from '../../../../ui/table';

const SentReqTableSkeleton = ({ rows }) => {
    return (
        <TableBody>
            {[...Array(rows)].map((_, index) => (
                <TableRow key={index} className="bg-white">

                    {/* SL */}
                    <TableCell className="text-center md:min-w-14">
                        <Skeleton width={20} height={20} />
                    </TableCell>

                    {/* Pet Name */}
                    <TableCell className="text-center md:min-w-32">
                        <Skeleton width={index % 2 === 0 ? 80 : 70} borderRadius={20} height={20} />
                        <Skeleton width={40} borderRadius={30} height={20} />
                    </TableCell>

                    {/* Image */}
                    <TableCell className="text-center md:min-w-32">
                        <Skeleton height={70} width={70} borderRadius={12} />
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center md:min-w-32">
                        <Skeleton width={index % 2 === 0 ? 90 : 70} height={24} borderRadius={12} />
                    </TableCell>

                    {/* timeStamp */}
                    <TableCell className="text-center space-y-1">
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
                    <TableCell className="text-center">
                        <Skeleton width={140} height={20} borderRadius={8} />
                    </TableCell>
                </TableRow>
            ))}

        </TableBody>
    );
};

export default SentReqTableSkeleton;
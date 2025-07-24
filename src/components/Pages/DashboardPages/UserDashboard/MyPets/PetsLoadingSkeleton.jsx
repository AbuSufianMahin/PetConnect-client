import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { TableBody, TableCell, TableRow } from '../../../../ui/table';

const PetsLoadingSkeleton = ({ rows = 2 }) => {
    return (
        <TableBody>
            {[...Array(rows)].map((_, index) => (
                <TableRow key={index} className="bg-white">

                    {/* SL */}
                    <TableCell className="text-center md:p-6 md:min-w-20">
                        <Skeleton width={20} height={20} />
                    </TableCell>

                    {/* Pet Name */}
                    <TableCell className="text-center md:p-6 md:min-w-32">
                        <Skeleton width={index % 2 === 0 ? 80 : 60} height={20} />
                    </TableCell>

                    {/* Category */}
                    <TableCell className="text-center md:p-6 md:min-w-32">
                        <Skeleton width={80} height={20} />
                    </TableCell>

                    {/* Image */}
                    <TableCell className="text-center md:p-6 md:min-w-32">
                        <Skeleton height={70} width={70} borderRadius={12} />
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center md:p-6 md:min-w-32">
                        <Skeleton width={index % 2 === 0 ? 90 : 70} height={24} borderRadius={12} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-center md:p-6 md:min-w-32">
                        <Skeleton width={140} height={32} borderRadius={8} />
                        <Skeleton width={140} height={32} borderRadius={8} />
                    </TableCell>
                </TableRow>
            ))}

        </TableBody>
    );
};

export default PetsLoadingSkeleton;
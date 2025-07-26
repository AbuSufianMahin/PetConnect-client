import React from 'react';
import {

    TableBody,
    TableCell,
    TableRow,
} from '../../../../ui/table';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllPetsLoadingSkeleton = ({ rows }) => {
    return (
        <TableBody>
            {[...Array(rows)].map((_, rowIdx) => (
                <TableRow key={rowIdx} className="bg-white">
                    {/* SL */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={16} width={20} />
                    </TableCell>

                    {/* Image */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={64} width={64} />
                    </TableCell>

                    {/* name */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={16} width={80} borderRadius={999} />
                    </TableCell>

                    {/* category */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={16} width={40} />
                    </TableCell>

                    {/* added by */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={16} width={rowIdx % 2 === 0 ? 120 : 100} borderRadius={8}/>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={16} width={100} borderRadius={999} />
                    </TableCell>

                    {/* added at */}
                    <TableCell className="text-center py-6">
                        <Skeleton height={80} width={112} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-center py-6 grid gap-2">
                        <Skeleton height={32} width={96} borderRadius={8} />
                        <Skeleton height={32} width={96} borderRadius={8} />
                        <Skeleton height={32} width={96} borderRadius={8} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default AllPetsLoadingSkeleton;
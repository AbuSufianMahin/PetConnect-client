import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserTableSkeleton = ({ rows }) => {
    return (
        <tbody className="w-full">
            {[...Array(rows)].map((_, idx) => (
                <tr
                    key={idx}
                    className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-center`}
                >
                    {/* SL */}
                    <td className="px-4 py-3">
                        <div className="mx-auto">
                            <Skeleton width={18} height={18} />
                        </div>
                    </td>

                    {/* Profile */}
                    <td className="px-4 py-3">
                        <div className="w-16 h-16 mx-auto rounded-full overflow-hidden">
                            <Skeleton circle width={64} height={64} />
                        </div>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3">
                        <Skeleton width={idx % 2 === 0 ? 100 : 140} height={20} />
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                        <Skeleton width={idx % 2 === 0 ? 160 : 120} height={20} />
                    </td>

                    {/* role */}
                    <td className="px-4 py-3">
                        <Skeleton width={idx % 2 === 0 ? 60 : 70} height={20} />
                    </td>

                    {/* Role added by */}
                    <td className="px-4 py-3">
                        <Skeleton width={idx % 2 === 0 ? 120 : 150} height={20} />
                    </td>

                    {/* Role Added at */}
                    <td className="px-4 py-3">
                        <Skeleton width={180} height={32} />
                    </td>
                    {/* Action */}
                    <td className="px-4 py-3">
                        <Skeleton width={120} height={36} borderRadius={16} />
                    </td>
                </tr>
            ))}
        </tbody>

    );
};

export default UserTableSkeleton;
import React from 'react';

export default function StickyTable({ columns, rows }) {
    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
            <table className="min-w-full table-sticky">
                <thead>
                <tr className="text-left">
                    {columns.map((c) => (
                        <th key={c} className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-inherit">
                            {c}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        {r.map((cell, ci) => (
                            <td key={ci} className="p-3 border-b border-gray-100 dark:border-gray-700 align-top">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

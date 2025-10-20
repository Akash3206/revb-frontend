import React from 'react';

export default function CapsuleGrid({ items, onInsertClick, onItemClick, label = 'Insert' }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    className="capsule-equal flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition"
                >
                    <div className="font-semibold">{item.name}</div>
                </button>
            ))}

            <button
                onClick={onInsertClick}
                className="capsule-equal flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <div className="flex flex-col items-center">
                    <div className="text-2xl">＋</div>
                    <div className="mt-1 text-sm">{label}</div>
                </div>
            </button>
        </div>
    );
}

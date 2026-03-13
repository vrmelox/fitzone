"use client";

import React from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ElementType;
    color: 'blue' | 'green' | 'orange' | 'purple';
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    color
}) => {
    const colorClasses = {
        blue: 'from-teal-400 to-cyan-400',
        green: 'from-purple-400 to-pink-400',
        orange: 'from-yellow-400 to-orange-400',
        purple: 'from-rose-400 to-pink-400'
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg`}>
                    <Icon className="text-white" size={24} />
                </div>
                {change && <span className="text-sm text-green-600 dark:text-green-400 font-semibold">{change}</span>}
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    );
};

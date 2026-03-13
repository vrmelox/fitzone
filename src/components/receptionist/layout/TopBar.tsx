"use client";

import React from 'react';
import {
    Clock,
    Wifi,
    Bell,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

interface Notification {
    id: number;
    type: 'warning' | 'info' | 'success';
    message: string;
    time: string;
}

interface TopBarProps {
    activeTabLabel: string;
    currentTime: Date;
    notifications: Notification[];
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
    activeTabLabel,
    currentTime,
    notifications,
    showNotifications,
    setShowNotifications
}) => {
    return (
        <div className="bg-white dark:bg-white shadow-sm border-b border-gray-100 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
                        {activeTabLabel}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <Wifi size={16} className="text-green-500" />
                        Système connecté - Temps réel
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                        <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                        <div className="text-right">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {currentTime.toLocaleTimeString('fr-FR')}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {currentTime.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                            <Bell size={20} />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-white rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-full ${notif.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/50' :
                                                        notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/50' :
                                                            'bg-blue-100 dark:bg-blue-900/50'
                                                    }`}>
                                                    {notif.type === 'warning' ? <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400" /> :
                                                        notif.type === 'success' ? <CheckCircle size={16} className="text-green-600 dark:text-green-400" /> :
                                                            <Bell size={16} className="text-blue-600 dark:text-blue-400" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export type { Notification, TopBarProps };

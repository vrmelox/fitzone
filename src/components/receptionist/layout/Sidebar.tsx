"use client";

import React from 'react';
import {
    Menu,
    X,
    Zap,
    Home,
    QrCode,
    UserPlus,
    Users,
    Calendar,
    BarChart3,
    Headphones,
    Settings,
    LogOut,
    Moon,
    Sun,
    User
} from 'lucide-react';
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";

interface MenuItem {
    id: string;
    label: string;
    icon: any;
}

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
    menuItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode,
    menuItems
}) => {
    return (
        <div className={`fixed left-0 top-0 h-full bg-white dark:bg-white shadow-lg border-r border-gray-100 dark:border-gray-700 transition-all duration-300 z-40 ${sidebarOpen ? 'w-72' : 'w-20'
            }`}>
            {/* Header Sidebar */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <Zap className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-800 dark:text-gray-200">FitnessPro</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard Admin</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
                    >
                        <Menu size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-100 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            <item.icon size={20} />
                            {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            {activeTab === item.id && sidebarOpen && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors text-gray-600 dark:text-gray-400"
                    >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        {sidebarOpen && <span className="text-sm">{darkMode ? 'Mode clair' : 'Mode sombre'}</span>}
                    </button>
                </div>

                {sidebarOpen && (
                    <ProfileDropdown
                        align="top"
                        user={{
                            name: "Sarah Martin",
                            role: "Réceptionniste",
                            initials: "S"
                        }}
                        items={[
                            { label: "Mon Profil", icon: User, href: "/receptionniste/profil" },
                            { label: "Paramètres", icon: Settings, href: "/receptionniste/parametres" }
                        ]}
                        trigger={
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">Sarah Martin</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Réceptionniste</p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                    <Settings size={16} />
                                </button>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export const MobileSidebar: React.FC<SidebarProps> = (props) => {
    const { sidebarOpen, setSidebarOpen } = props;

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <Sidebar {...props} />
            </div>
        </>
    );
};

export type { MenuItem, SidebarProps };

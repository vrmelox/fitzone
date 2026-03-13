"use client";

import {
    Search,
    Bell,
    Menu,
    User,
    Settings
} from "lucide-react";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button
                    className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={onMenuClick}
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>

                <div className="hidden lg:block">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">Vue d'ensemble de votre salle de sport</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="hidden md:flex items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                    <button className="relative p-2.5 text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-xl transition-all">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-3 w-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></span>
                    </button>

                    <div className="h-6 w-px bg-gray-200" />

                    <ProfileDropdown
                        user={{
                            name: "Admin",
                            role: "Super Admin",
                            initials: "A"
                        }}
                        items={[
                            { label: "Mon Profil", icon: User, href: "/administrateur/profil" },
                            { label: "Paramètres", icon: Settings, href: "/administrateur/parametres" }
                        ]}
                    />
                </div>
            </div>
        </div>
    </header>
);

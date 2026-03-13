"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    Bell,
    ChevronDown,
    X,
    BarChart3,
    Target,
    Calendar as CalendarIcon,
    Activity,
    Award,
    User,
    CreditCard,
    MapPin,
    Settings,
    LogOut
} from "lucide-react";
import { Card, Badge } from "@/components/ui/dashboard-components";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";

// ==================== HEADER ====================
export const Header = ({ onMenuClick, memberName }: {
    onMenuClick: () => void;
    memberName: string;
}) => (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button
                    className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={onMenuClick}
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>

                <div>
                    <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Salut {memberName} ! 👋
                    </h1>
                    <p className="text-gray-500 text-sm">Prêt pour votre entraînement ?</p>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="relative p-2.5 text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-xl transition-all">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-3 w-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></span>
                </button>

                {/* Profile */}
                <ProfileDropdown
                    user={{
                        name: memberName,
                        role: "Membre Premium",
                        initials: memberName.charAt(0)
                    }}
                    items={[
                        { label: "Mon Profil", icon: User, href: "/utilisateur/profile" },
                        { label: "Paramètres", icon: Settings, href: "/utilisateur/parametres" }
                    ]}
                />
            </div>
        </div>
    </header>
);

// ==================== NAVIGATION ====================
export const NavigationItem = ({
    icon: Icon,
    label,
    href,
    badge,
    onClick
}: {
    icon: any;
    label: string;
    href: string;
    badge?: number | string;
    onClick?: () => void;
}) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group
        ${isActive
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50"
                }
      `}
        >
            <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                <span className="font-medium">{label}</span>
            </div>
            {badge && (
                <span className="bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {badge}
                </span>
            )}
        </Link>
    );
};

export const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <>
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-500 to-cyan-500">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/"
                        className="hidden md:block md:text-2xl font-bold bg-gradient-to-r from-white to-[#FAD02C] bg-clip-text text-transparent hover:from-[#FAD02C] hover:to-white transition-all duration-500"
                    >
                        Gogym
                    </Link>
                    <p className="text-teal-100 text-sm">Votre espace membre</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg">
                        <X className="h-6 w-6" />
                    </button>
                )}
            </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
            <NavigationItem icon={BarChart3} label="Dashboard" href="/utilisateur" />
            <NavigationItem icon={CalendarIcon} label="Planning & Cours" href="/utilisateur/planning" badge="2" />
            <NavigationItem icon={Activity} label="Mes Stats" href="/utilisateur/stats" />
            <NavigationItem icon={User} label="Mon Profil" href="/utilisateur/profile" />
            <NavigationItem icon={CreditCard} label="Abonnement" href="/utilisateur/paiements" />
            <NavigationItem icon={MapPin} label="Plan de la Salle" href="/utilisateur/carte" />
            <NavigationItem icon={Settings} label="Paramètres" href="/utilisateur/parametres" />
            <div className="pt-4 mt-4 border-t border-gray-100">
                <NavigationItem icon={LogOut} label="Déconnexion" href="/login" />
            </div>
        </nav>

        {/* Membership Status */}
        <div className="absolute bottom-4 left-4 right-4">
            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="premium">Premium</Badge>
                    <Badge variant="success" size="xs">Actif</Badge>
                </div>
                <div className="text-sm text-gray-600">
                    <div>Expire dans <span className="font-bold text-gray-900">23 jours</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-1 rounded-full w-3/4"></div>
                    </div>
                </div>
            </Card>
        </div>
    </>
);

export const MobileSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <>
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
        )}

        <div className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
            <SidebarContent onClose={onClose} />
        </div>
    </>
);

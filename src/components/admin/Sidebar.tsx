"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    Activity,
    Calendar,
    Settings,
    Bell,
    CreditCard,
    Dumbbell,
    X,
    ChevronDown,
    User
} from "lucide-react";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";

// ==================== NAVIGATION ====================

const NavigationItem = ({
    icon: Icon,
    label,
    active = false,
    badge,
    color = "teal",
    href
}: {
    icon: any;
    label: string;
    active?: boolean;
    badge?: number;
    color?: string;
    href: string;
}) => {
    const activeColors = {
        teal: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
        purple: "bg-gradient-to-r from-purple-50 to-pink-500 text-white",
        yellow: "bg-gradient-to-r from-yellow-400 to-orange-400 text-black"
    };

    return (
        <Link href={href} className={`
      w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group
      ${active
                ? activeColors[color as keyof typeof activeColors] || activeColors.teal
                : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50"
            }
    `}>
            <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${active ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
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

export const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
    const pathname = usePathname();

    return (
        <>
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-500 to-cyan-500">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/"
                            className="hidden md:block md:text-2xl font-bold bg-gradient-to-r from-white to-[#FAD02C] bg-clip-text text-transparent hover:from-[#FAD02C] hover:to-white transition-all duration-500"
                        >
                            Gogym
                        </Link>
                        <p className="text-teal-100 text-sm">Admin Dashboard</p>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg">
                            <X className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>

            <nav className="p-4 space-y-2">
                <NavigationItem icon={Activity} label="Dashboard" active={pathname === "/administrateur"} color="teal" href="/administrateur" />
                <NavigationItem icon={Users} label="Membres" badge={12} active={pathname === "/administrateur/membres"} href="/administrateur/membres" />
                <NavigationItem icon={User} label="Équipe" active={pathname === "/administrateur/equipe"} href="/administrateur/equipe" />
                <NavigationItem icon={Calendar} label="Planning" badge={3} active={pathname === "/administrateur/planning"} href="/administrateur/planning" />
                <NavigationItem icon={Dumbbell} label="Équipements" active={pathname === "/administrateur/equipements"} href="/administrateur/equipements" />
                <NavigationItem icon={CreditCard} label="Paiements" active={pathname === "/administrateur/paiements"} href="/administrateur/paiements" />
                <NavigationItem icon={Bell} label="Notifications" badge={5} active={pathname === "/administrateur/notifications"} href="/administrateur/notifications" />
                <NavigationItem icon={User} label="Profil" active={pathname === "/administrateur/profil"} href="/administrateur/profil" />
                <NavigationItem icon={Settings} label="Paramètres" active={pathname === "/administrateur/parametres"} href="/administrateur/parametres" />
            </nav>

            {/* User Profile Card */}
            <div className="absolute bottom-4 left-4 right-4">
                <ProfileDropdown
                    align="top"
                    user={{
                        name: "Admin User",
                        email: "admin@gogym.com",
                        initials: "A"
                    }}
                    items={[
                        { label: "Mon Profil", icon: User, href: "/administrateur/profil" },
                        { label: "Paramètres", icon: Settings, href: "/administrateur/parametres" }
                    ]}
                    trigger={
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-md transition-all">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">A</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">Admin User</p>
                                    <p className="text-sm text-gray-500 truncate">admin@gogym.com</p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    }
                />
            </div>
        </>
    );
};

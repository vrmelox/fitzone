"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";

interface ProfileDropdownProps {
    user: {
        name: string;
        email?: string;
        role?: string;
        avatar?: string;
        initials?: string;
    };
    items?: {
        label: string;
        icon: any;
        href: string;
        onClick?: () => void;
        color?: string;
    }[];
    align?: "left" | "right" | "top";
    trigger?: React.ReactNode;
}

export const ProfileDropdown = ({
    user,
    items,
    align = "right",
    trigger
}: ProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const defaultItems = [
        { label: "Mon Profil", icon: User, href: "/profile" },
        { label: "Paramètres", icon: Settings, href: "/settings" },
    ];

    const menuItems = items || defaultItems;

    const getAlignmentClasses = () => {
        switch (align) {
            case "left":
                return "left-0 mt-2 origin-top-left";
            case "top":
                return "bottom-full left-0 mb-2 origin-bottom-left";
            case "right":
            default:
                return "right-0 mt-2 origin-top-right";
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger || (
                    <div className="flex items-center space-x-3 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors">
                        <div className="h-8 w-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-sm font-bold">
                                {user.initials || user.name.charAt(0)}
                            </span>
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            {user.role && <p className="text-xs text-gray-500">{user.role}</p>}
                        </div>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                )}
            </div>

            {isOpen && (
                <div className={`absolute z-50 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 ${getAlignmentClasses()}`}>
                    {/* Mobile User Info (visible only in dropdown on mobile if not in trigger) */}
                    <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        {user.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                    </div>

                    <div className="py-1">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => {
                                    setIsOpen(false);
                                    item.onClick?.();
                                }}
                                className={`flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${item.color || "text-gray-700"}`}
                            >
                                <item.icon className={`h-4 w-4 mr-3 ${item.color || "text-gray-400"}`} />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link
                            href="/login"
                            className="flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-3" />
                            Déconnexion
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

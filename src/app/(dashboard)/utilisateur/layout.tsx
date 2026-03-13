"use client";

import { useState, useEffect } from "react";
import { SidebarContent, MobileSidebar, Header } from "@/components/ui/dashboard-shell";
import { getCurrentUser, User } from "@/lib/auth";

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                console.log("DEBUG: Layout fetchUser result:", userData); // DEBUG
                setUser(userData);
            } catch (error) {
                console.error("DEBUG: Error fetching user in layout:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar Mobile */}
            <MobileSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Sidebar Desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:bg-white lg:border-r lg:border-gray-100 lg:block lg:shadow-xl">
                <SidebarContent />
            </div>

            {/* Contenu principal */}
            <div className="lg:ml-72">
                <Header
                    onMenuClick={() => setSidebarOpen(true)}
                    memberName={user ? `${user.first_name} ${user.last_name}` : "Chargement..."}
                />

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}

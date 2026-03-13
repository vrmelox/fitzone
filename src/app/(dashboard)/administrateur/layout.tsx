"use client";

import { useState } from "react";
import { SidebarContent, MobileSidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
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
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 lg:p-8 space-y-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

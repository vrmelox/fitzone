"use client"

import { Modal } from "@/components/ui/Modal";
import { AddPersonForm } from "@/components/admin/forms/AddPersonForm";

import { useState } from "react";
import {
    User,
    Search,
    Plus,
    Edit,
    Trash2,
    Mail,
    Phone,
    Shield,
    Calendar,
    Clock,
    Award,
    TrendingUp
} from "lucide-react";

interface StaffMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "Admin" | "Receptionist" | "Coach" | "Maintenance";
    status: "Actif" | "Congé" | "Inactif";
    joinDate: string;
    schedule: string;
    performance: number;
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) => {
    const variants: Record<string, string> = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        admin: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
        coach: "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800"
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>{children}</span>;
};

export default function EquipePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const staff: StaffMember[] = [
        {
            id: "1",
            name: "Marie Dupont",
            email: "marie.d@gogym.com",
            phone: "+33 6 12 34 56 78",
            role: "Coach",
            status: "Actif",
            joinDate: "2023-01-15",
            schedule: "Lun-Ven 9h-17h",
            performance: 95
        },
        {
            id: "2",
            name: "Thomas Bernard",
            email: "thomas.b@gogym.com",
            phone: "+33 6 23 45 67 89",
            role: "Receptionist",
            status: "Actif",
            joinDate: "2023-03-20",
            schedule: "Lun-Sam 8h-16h",
            performance: 88
        },
        {
            id: "3",
            name: "Sophie Laurent",
            email: "sophie.l@gogym.com",
            phone: "+33 6 34 56 78 90",
            role: "Coach",
            status: "Actif",
            joinDate: "2023-06-10",
            schedule: "Mar-Sam 10h-18h",
            performance: 92
        },
        {
            id: "4",
            name: "Pierre Moreau",
            email: "pierre.m@gogym.com",
            phone: "+33 6 45 67 89 01",
            role: "Maintenance",
            status: "Actif",
            joinDate: "2022-11-05",
            schedule: "Lun-Ven 7h-15h",
            performance: 85
        }
    ];

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Ajouter un membre de l'équipe"
            >
                <AddPersonForm type="staff" onClose={() => setIsAddModalOpen(false)} />
            </Modal>

            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Gestion de l'Équipe
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Gérez votre personnel et leurs horaires</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Nouveau Membre
                    </button>
                </div>
            </div>


            <div className="p-6 space-y-6">
                {/* Search */}
                <Card className="p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un membre de l'équipe..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                        />
                    </div>
                </Card>

                {/* Staff Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStaff.map((member, index) => (
                        <Card key={member.id} className="p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`h-16 w-16 bg-gradient-to-br ${index % 4 === 0 ? "from-teal-400 to-cyan-400" :
                                    index % 4 === 1 ? "from-purple-400 to-pink-400" :
                                        index % 4 === 2 ? "from-yellow-400 to-orange-400" :
                                            "from-rose-400 to-pink-400"
                                    } rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                                    {member.name.charAt(0)}
                                </div>
                                <Badge variant={member.role === "Admin" ? "admin" : member.role === "Coach" ? "coach" : "default"}>
                                    {member.role}
                                </Badge>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {member.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="h-4 w-4 mr-2" />
                                    {member.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {member.schedule}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-600">Performance</span>
                                    <span className="font-bold text-gray-900">{member.performance}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                                        style={{ width: `${member.performance}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all text-sm font-medium">
                                    <Edit className="h-4 w-4 inline mr-1" />
                                    Modifier
                                </button>
                                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Trash2 className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

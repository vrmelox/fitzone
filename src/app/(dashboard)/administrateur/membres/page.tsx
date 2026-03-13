"use client"

import { Modal } from "@/components/ui/Modal";
import { AddPersonForm } from "@/components/admin/forms/AddPersonForm";

import { useState } from "react";
import {
    Users,
    Search,
    Filter,
    Download,
    Plus,
    Edit,
    Trash2,
    Mail,
    Phone,
    Calendar,
    CreditCard,
    TrendingUp,
    UserCheck,
    UserX,
    Award,
    Eye
} from "lucide-react";

// Types
interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    membershipType: "Basic" | "Premium" | "VIP";
    status: "Actif" | "Suspendu" | "Expiré";
    joinDate: string;
    endDate: string;
    lastVisit: string;
    totalVisits: number;
    avatar?: string;
}

// UI Components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({
    children,
    variant = "default"
}: {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "premium" | "vip";
}) => {
    const variants = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-rose-100 text-rose-800",
        premium: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
        vip: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};

const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle
}: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
}) => (
    <Card className="p-6 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full -translate-y-8 translate-x-8`} />
        <div className="relative">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                </div>
                <div className={`h-12 w-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    </Card>
);

export default function MembresPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterType, setFilterType] = useState<string>("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Mock data
    const members: Member[] = [
        {
            id: "1",
            name: "Sarah Wilson",
            email: "sarah.w@email.com",
            phone: "+33 6 12 34 56 78",
            membershipType: "Premium",
            status: "Actif",
            joinDate: "2024-01-15",
            endDate: "2025-01-15",
            lastVisit: "Aujourd'hui",
            totalVisits: 145
        },
        {
            id: "2",
            name: "Mike Johnson",
            email: "mike.j@email.com",
            phone: "+33 6 23 45 67 89",
            membershipType: "VIP",
            status: "Actif",
            joinDate: "2024-01-14",
            endDate: "2025-01-14",
            lastVisit: "Hier",
            totalVisits: 203
        },
        {
            id: "3",
            name: "Emma Brown",
            email: "emma.b@email.com",
            phone: "+33 6 34 56 78 90",
            membershipType: "Basic",
            status: "Suspendu",
            joinDate: "2024-01-13",
            endDate: "2024-12-13",
            lastVisit: "Il y a 3 jours",
            totalVisits: 67
        },
        {
            id: "4",
            name: "Alex Chen",
            email: "alex.c@email.com",
            phone: "+33 6 45 67 89 01",
            membershipType: "Premium",
            status: "Actif",
            joinDate: "2024-01-12",
            endDate: "2025-01-12",
            lastVisit: "Aujourd'hui",
            totalVisits: 178
        },
        {
            id: "5",
            name: "Sophie Martin",
            email: "sophie.m@email.com",
            phone: "+33 6 56 78 90 12",
            membershipType: "VIP",
            status: "Actif",
            joinDate: "2023-12-01",
            endDate: "2024-12-01",
            lastVisit: "Aujourd'hui",
            totalVisits: 289
        },
        {
            id: "6",
            name: "Lucas Dubois",
            email: "lucas.d@email.com",
            phone: "+33 6 67 89 01 23",
            membershipType: "Basic",
            status: "Expiré",
            joinDate: "2023-11-15",
            endDate: "2024-11-15",
            lastVisit: "Il y a 1 semaine",
            totalVisits: 45
        }
    ];

    const stats = {
        total: 342,
        active: 298,
        suspended: 12,
        expired: 32
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || member.status === filterStatus;
        const matchesType = filterType === "all" || member.membershipType === filterType;
        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Ajouter un nouveau membre"
            >
                <AddPersonForm type="member" onClose={() => setIsAddModalOpen(false)} />
            </Modal>

            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Gestion des Membres
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Gérez et suivez tous vos membres</p>
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
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Membres"
                        value={stats.total}
                        icon={Users}
                        color="from-teal-400 to-cyan-400"
                    />
                    <StatCard
                        title="Membres Actifs"
                        value={stats.active}
                        icon={UserCheck}
                        color="from-emerald-400 to-green-400"
                    />
                    <StatCard
                        title="Suspendus"
                        value={stats.suspended}
                        icon={UserX}
                        color="from-amber-400 to-orange-400"
                    />
                    <StatCard
                        title="Expirés"
                        value={stats.expired}
                        icon={Calendar}
                        color="from-rose-400 to-pink-400"
                    />
                </div>

                {/* Filters and Search */}
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un membre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="Actif">Actif</option>
                            <option value="Suspendu">Suspendu</option>
                            <option value="Expiré">Expiré</option>
                        </select>

                        {/* Type Filter */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                        >
                            <option value="all">Tous les types</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="VIP">VIP</option>
                        </select>

                        {/* Export Button */}
                        <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <Download className="h-5 w-5 text-gray-600" />
                            <span className="hidden md:inline">Exporter</span>
                        </button>
                    </div>
                </Card>

                {/* Members Table */}
                <Card className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Membre</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden md:table-cell">Contact</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden sm:table-cell">Type</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden lg:table-cell">Statut</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden xl:table-cell">Visites</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.map((member, index) => (
                                    <tr key={member.id} className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all">
                                        <td className="py-4 px-2">
                                            <div className="flex items-center space-x-3">
                                                <div className={`h-10 w-10 bg-gradient-to-br ${index % 4 === 0 ? "from-teal-400 to-cyan-400" :
                                                    index % 4 === 1 ? "from-purple-400 to-pink-400" :
                                                        index % 4 === 2 ? "from-yellow-400 to-orange-400" :
                                                            "from-rose-400 to-pink-400"
                                                    } rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{member.name}</div>
                                                    <div className="text-xs text-gray-500 md:hidden">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 hidden md:table-cell">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Mail className="h-3 w-3 mr-2" />
                                                    {member.email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Phone className="h-3 w-3 mr-2" />
                                                    {member.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 hidden sm:table-cell">
                                            <Badge variant={member.membershipType === "VIP" ? "vip" : member.membershipType === "Premium" ? "premium" : "default"}>
                                                {member.membershipType}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-2 hidden lg:table-cell">
                                            <Badge variant={member.status === "Actif" ? "success" : member.status === "Suspendu" ? "warning" : "danger"}>
                                                {member.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-2 text-sm text-gray-600 hidden xl:table-cell">
                                            <div className="flex items-center">
                                                <TrendingUp className="h-4 w-4 mr-1 text-teal-500" />
                                                {member.totalVisits} visites
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex items-center space-x-1">
                                                <button className="p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-500 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Affichage {filteredMembers.length} sur {members.length} membres
                        </p>
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Précédent
                            </button>
                            <button className="px-4 py-2 text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all">
                                Suivant
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

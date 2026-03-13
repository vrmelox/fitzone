"use client"

import { Modal } from "@/components/ui/Modal";
import { AddEquipmentForm } from "@/components/admin/forms/AddEquipmentForm";

import { useState } from "react";
import {
    Dumbbell,
    Plus,
    Search,
    Edit,
    Trash2,
    AlertCircle,
    CheckCircle,
    Clock,
    Wrench
} from "lucide-react";

interface Equipment {
    id: string;
    name: string;
    category: string;
    status: "Disponible" | "En utilisation" | "Maintenance" | "Hors service";
    location: string;
    lastMaintenance: string;
    nextMaintenance: string;
    usageCount: number;
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
        danger: "bg-rose-100 text-rose-800",
        info: "bg-blue-100 text-blue-800"
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>{children}</span>;
};

export default function EquipementsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const equipment: Equipment[] = [
        {
            id: "1",
            name: "Tapis de course Pro X1",
            category: "Cardio",
            status: "Disponible",
            location: "Zone Cardio A",
            lastMaintenance: "2024-10-15",
            nextMaintenance: "2025-01-15",
            usageCount: 1245
        },
        {
            id: "2",
            name: "Vélo elliptique Elite",
            category: "Cardio",
            status: "En utilisation",
            location: "Zone Cardio B",
            lastMaintenance: "2024-11-01",
            nextMaintenance: "2025-02-01",
            usageCount: 892
        },
        {
            id: "3",
            name: "Banc de musculation",
            category: "Musculation",
            status: "Maintenance",
            location: "Zone Poids",
            lastMaintenance: "2024-11-20",
            nextMaintenance: "2025-02-20",
            usageCount: 567
        },
        {
            id: "4",
            name: "Rameur Concept2",
            category: "Cardio",
            status: "Disponible",
            location: "Zone Cardio C",
            lastMaintenance: "2024-10-20",
            nextMaintenance: "2025-01-20",
            usageCount: 734
        },
        {
            id: "5",
            name: "Smith Machine",
            category: "Musculation",
            status: "Hors service",
            location: "Zone Poids",
            lastMaintenance: "2024-09-15",
            nextMaintenance: "2024-12-15",
            usageCount: 423
        }
    ];

    const filteredEquipment = equipment.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: equipment.length,
        available: equipment.filter(e => e.status === "Disponible").length,
        maintenance: equipment.filter(e => e.status === "Maintenance").length,
        outOfService: equipment.filter(e => e.status === "Hors service").length
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Ajouter un nouvel équipement"
            >
                <AddEquipmentForm onClose={() => setIsAddModalOpen(false)} />
            </Modal>

            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Gestion des Équipements
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Suivez l'état et la maintenance de vos équipements</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Nouvel Équipement
                    </button>
                </div>
            </div>


            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <Dumbbell className="h-8 w-8 text-teal-500" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Disponibles</p>
                                <p className="text-2xl font-bold text-emerald-600">{stats.available}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Maintenance</p>
                                <p className="text-2xl font-bold text-amber-600">{stats.maintenance}</p>
                            </div>
                            <Wrench className="h-8 w-8 text-amber-500" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Hors service</p>
                                <p className="text-2xl font-bold text-rose-600">{stats.outOfService}</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-rose-500" />
                        </div>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un équipement..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="Disponible">Disponible</option>
                            <option value="En utilisation">En utilisation</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Hors service">Hors service</option>
                        </select>
                    </div>
                </Card>

                {/* Equipment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEquipment.map((item, index) => (
                        <Card key={item.id} className="p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`h-12 w-12 bg-gradient-to-br ${index % 4 === 0 ? "from-teal-400 to-cyan-400" :
                                    index % 4 === 1 ? "from-purple-400 to-pink-400" :
                                        index % 4 === 2 ? "from-yellow-400 to-orange-400" :
                                            "from-rose-400 to-pink-400"
                                    } rounded-xl flex items-center justify-center shadow-lg`}>
                                    <Dumbbell className="h-6 w-6 text-white" />
                                </div>
                                <Badge variant={
                                    item.status === "Disponible" ? "success" :
                                        item.status === "En utilisation" ? "info" :
                                            item.status === "Maintenance" ? "warning" :
                                                "danger"
                                }>
                                    {item.status}
                                </Badge>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{item.category} • {item.location}</p>

                            <div className="space-y-2 mb-4 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>Utilisations:</span>
                                    <span className="font-semibold">{item.usageCount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Dernière maintenance:</span>
                                    <span className="font-semibold">{new Date(item.lastMaintenance).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Prochaine maintenance:</span>
                                    <span className="font-semibold">{new Date(item.nextMaintenance).toLocaleDateString('fr-FR')}</span>
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

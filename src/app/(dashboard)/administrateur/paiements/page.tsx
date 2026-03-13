"use client";

import { useState } from "react";
import {
    CreditCard,
    Search,
    Download,
    TrendingUp,
    DollarSign,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle
} from "lucide-react";

interface Payment {
    id: string;
    memberName: string;
    amount: number;
    method: "Carte" | "Espèces" | "Virement" | "Prélèvement";
    status: "Payé" | "En attente" | "Échoué" | "Remboursé";
    date: string;
    type: string;
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
        danger: "bg-rose-100 text-rose-800"
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>{children}</span>;
};

export default function PaiementsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const payments: Payment[] = [
        {
            id: "1",
            memberName: "Sarah Wilson",
            amount: 49.99,
            method: "Carte",
            status: "Payé",
            date: "2024-11-24",
            type: "Abonnement Premium"
        },
        {
            id: "2",
            memberName: "Mike Johnson",
            amount: 79.99,
            method: "Prélèvement",
            status: "Payé",
            date: "2024-11-23",
            type: "Abonnement VIP"
        },
        {
            id: "3",
            memberName: "Emma Brown",
            amount: 29.99,
            method: "Espèces",
            status: "En attente",
            date: "2024-11-22",
            type: "Abonnement Basic"
        },
        {
            id: "4",
            memberName: "Alex Chen",
            amount: 49.99,
            method: "Carte",
            status: "Échoué",
            date: "2024-11-21",
            type: "Abonnement Premium"
        },
        {
            id: "5",
            memberName: "Sophie Martin",
            amount: 79.99,
            method: "Virement",
            status: "Payé",
            date: "2024-11-20",
            type: "Abonnement VIP"
        }
    ];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
        paid: payments.filter(p => p.status === "Payé").length,
        pending: payments.filter(p => p.status === "En attente").length,
        failed: payments.filter(p => p.status === "Échoué").length
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Gestion des Paiements
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Suivez les revenus et les transactions</p>
                    </div>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg">
                        <Download className="h-5 w-5 mr-2" />
                        Exporter
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <DollarSign className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toFixed(2)}€</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Payés</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <CheckCircle className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.paid}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">En attente</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Échoués</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <AlertCircle className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.failed}</p>
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
                                placeholder="Rechercher un paiement..."
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
                            <option value="Payé">Payé</option>
                            <option value="En attente">En attente</option>
                            <option value="Échoué">Échoué</option>
                            <option value="Remboursé">Remboursé</option>
                        </select>
                    </div>
                </Card>

                {/* Payments Table */}
                <Card className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Membre</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden md:table-cell">Type</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Montant</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden sm:table-cell">Méthode</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all">
                                        <td className="py-4 px-2">
                                            <div className="font-semibold text-gray-900">{payment.memberName}</div>
                                        </td>
                                        <td className="py-4 px-2 text-sm text-gray-600 hidden md:table-cell">
                                            {payment.type}
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="font-bold text-gray-900">{payment.amount.toFixed(2)}€</div>
                                        </td>
                                        <td className="py-4 px-2 text-sm text-gray-600 hidden sm:table-cell">
                                            <div className="flex items-center">
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                {payment.method}
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-sm text-gray-600 hidden lg:table-cell">
                                            {new Date(payment.date).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="py-4 px-2">
                                            <Badge variant={
                                                payment.status === "Payé" ? "success" :
                                                    payment.status === "En attente" ? "warning" :
                                                        "danger"
                                            }>
                                                {payment.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

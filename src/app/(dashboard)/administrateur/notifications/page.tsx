"use client";

import { useState } from "react";
import {
    Bell,
    CheckCircle,
    AlertCircle,
    Info,
    DollarSign,
    Users,
    Calendar,
    Settings,
    Trash2,
    Check
} from "lucide-react";

interface Notification {
    id: string;
    type: "success" | "warning" | "info" | "payment";
    title: string;
    message: string;
    time: string;
    read: boolean;
    category: "Système" | "Membre" | "Paiement" | "Équipement";
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
        info: "bg-blue-100 text-blue-800",
        payment: "bg-purple-100 text-purple-800"
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>{children}</span>;
};

export default function NotificationsPage() {
    const [filter, setFilter] = useState("all");
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            type: "success",
            title: "Nouveau membre inscrit",
            message: "Sarah Wilson a rejoint votre salle avec un abonnement Premium",
            time: "Il y a 5 min",
            read: false,
            category: "Membre"
        },
        {
            id: "2",
            type: "payment",
            title: "Paiement reçu",
            message: "Paiement de 52.470 F CFA reçu de Mike Johnson (Abonnement VIP)",
            time: "Il y a 15 min",
            read: false,
            category: "Paiement"
        },
        {
            id: "3",
            type: "warning",
            title: "Maintenance requise",
            message: "Le tapis de course #3 nécessite une maintenance",
            time: "Il y a 1h",
            read: false,
            category: "Équipement"
        },
        {
            id: "4",
            type: "info",
            title: "Cours complet",
            message: "Le cours de Yoga de 18h est maintenant complet (20/20)",
            time: "Il y a 2h",
            read: true,
            category: "Système"
        },
        {
            id: "5",
            type: "success",
            title: "Objectif atteint",
            message: "Emma Brown a atteint son objectif de perte de poids !",
            time: "Il y a 3h",
            read: true,
            category: "Membre"
        },
        {
            id: "6",
            type: "warning",
            title: "Paiement échoué",
            message: "Le paiement automatique de Alex Chen a échoué",
            time: "Il y a 5h",
            read: true,
            category: "Paiement"
        }
    ]);

    const filteredNotifications = notifications.filter(notif => {
        if (filter === "all") return true;
        if (filter === "unread") return !notif.read;
        return notif.category === filter;
    });

    const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.read).length,
        today: notifications.filter(n => n.time.includes("min") || n.time.includes("h")).length
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "success": return CheckCircle;
            case "warning": return AlertCircle;
            case "payment": return DollarSign;
            default: return Info;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case "success": return "from-emerald-400 to-green-400";
            case "warning": return "from-amber-400 to-orange-400";
            case "payment": return "from-purple-400 to-pink-400";
            default: return "from-blue-400 to-cyan-400";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Centre de Notifications
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Restez informé des événements importants</p>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Check className="h-5 w-5 mr-2" />
                        Tout marquer comme lu
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Total</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Bell className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Non lues</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <AlertCircle className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.unread}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.today}</p>
                        </div>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {["all", "unread", "Système", "Membre", "Paiement", "Équipement"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg transition-all ${filter === f
                                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {f === "all" ? "Toutes" : f === "unread" ? "Non lues" : f}
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.map((notif) => {
                        const IconComponent = getIcon(notif.type);
                        return (
                            <Card
                                key={notif.id}
                                className={`p-6 hover:shadow-xl transition-shadow ${!notif.read ? "border-l-4 border-teal-500" : ""}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`h-12 w-12 bg-gradient-to-br ${getColor(notif.type)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{notif.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                            </div>
                                            <Badge variant={notif.type}>{notif.category}</Badge>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm text-gray-500">{notif.time}</span>
                                            <div className="flex items-center gap-2">
                                                {!notif.read && (
                                                    <button
                                                        onClick={() => markAsRead(notif.id)}
                                                        className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
                                                    >
                                                        Marquer comme lu
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notif.id)}
                                                    className="p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

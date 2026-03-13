"use client";

import { useState } from "react";
import {
    Target,
    Plus,
    TrendingUp,
    TrendingDown,
    Award,
    Calendar,
    User
} from "lucide-react";

interface Goal {
    id: string;
    memberName: string;
    goalType: "Perte de poids" | "Prise de masse" | "Endurance" | "Force";
    target: string;
    current: string;
    progress: number;
    startDate: string;
    targetDate: string;
    coach: string;
    status: "En cours" | "Atteint" | "Abandonné";
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

export default function ObjectifsPage() {
    const goals: Goal[] = [
        {
            id: "1",
            memberName: "Sarah Wilson",
            goalType: "Perte de poids",
            target: "70kg",
            current: "75kg",
            progress: 50,
            startDate: "2024-09-01",
            targetDate: "2025-01-01",
            coach: "Marie Dupont",
            status: "En cours"
        },
        {
            id: "2",
            memberName: "Mike Johnson",
            goalType: "Prise de masse",
            target: "85kg",
            current: "82kg",
            progress: 75,
            startDate: "2024-10-01",
            targetDate: "2025-02-01",
            coach: "Thomas Bernard",
            status: "En cours"
        },
        {
            id: "3",
            memberName: "Emma Brown",
            goalType: "Endurance",
            target: "10km en 45min",
            current: "10km en 52min",
            progress: 65,
            startDate: "2024-08-15",
            targetDate: "2024-12-15",
            coach: "Sophie Laurent",
            status: "En cours"
        },
        {
            id: "4",
            memberName: "Alex Chen",
            goalType: "Force",
            target: "Bench 100kg",
            current: "Bench 95kg",
            progress: 95,
            startDate: "2024-07-01",
            targetDate: "2024-12-01",
            coach: "Thomas Bernard",
            status: "En cours"
        }
    ];

    const stats = {
        total: goals.length,
        inProgress: goals.filter(g => g.status === "En cours").length,
        achieved: goals.filter(g => g.status === "Atteint").length,
        avgProgress: Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Suivi des Objectifs
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Suivez les progrès de vos membres</p>
                    </div>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg">
                        <Plus className="h-5 w-5 mr-2" />
                        Nouvel Objectif
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Total</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">En cours</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Atteints</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.achieved}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Progrès Moyen</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.avgProgress}%</p>
                        </div>
                    </Card>
                </div>

                {/* Goals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal, index) => (
                        <Card key={goal.id} className="p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{goal.memberName}</h3>
                                    <p className="text-sm text-gray-600">{goal.goalType}</p>
                                </div>
                                <Badge variant={goal.status === "Atteint" ? "success" : goal.status === "En cours" ? "warning" : "danger"}>
                                    {goal.status}
                                </Badge>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Objectif:</span>
                                    <span className="font-semibold text-gray-900">{goal.target}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Actuel:</span>
                                    <span className="font-semibold text-gray-900">{goal.current}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Coach:</span>
                                    <span className="font-semibold text-gray-900">{goal.coach}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Date cible:</span>
                                    <span className="font-semibold text-gray-900">
                                        {new Date(goal.targetDate).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-600">Progression</span>
                                    <span className="font-bold text-gray-900">{goal.progress}%</span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${index % 4 === 0 ? "from-teal-400 to-cyan-400" :
                                                index % 4 === 1 ? "from-purple-400 to-pink-400" :
                                                    index % 4 === 2 ? "from-yellow-400 to-orange-400" :
                                                        "from-emerald-400 to-green-400"
                                            } rounded-full transition-all duration-500`}
                                        style={{ width: `${goal.progress}%` }}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

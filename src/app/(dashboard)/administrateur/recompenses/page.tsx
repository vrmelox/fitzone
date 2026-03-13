"use client";

import { useState } from "react";
import {
    Award,
    Plus,
    Trophy,
    Star,
    Medal,
    Crown,
    Target,
    Zap
} from "lucide-react";

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: "Assiduité" | "Performance" | "Objectif" | "Social";
    points: number;
    unlockedBy: number;
    color: string;
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) => {
    const variants: Record<string, string> = {
        default: "bg-gray-100 text-gray-800",
        gold: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800",
        silver: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800",
        bronze: "bg-gradient-to-r from-orange-100 to-amber-100 text-amber-800"
    };
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>{children}</span>;
};

export default function RecompensesPage() {
    const achievements: Achievement[] = [
        {
            id: "1",
            name: "Premier Pas",
            description: "Première visite à la salle",
            icon: "star",
            category: "Assiduité",
            points: 10,
            unlockedBy: 342,
            color: "from-teal-400 to-cyan-400"
        },
        {
            id: "2",
            name: "Marathonien",
            description: "100 visites accomplies",
            icon: "trophy",
            category: "Assiduité",
            points: 100,
            unlockedBy: 45,
            color: "from-yellow-400 to-orange-400"
        },
        {
            id: "3",
            name: "Force Titanesque",
            description: "Bench press 100kg",
            icon: "medal",
            category: "Performance",
            points: 150,
            unlockedBy: 23,
            color: "from-purple-400 to-pink-400"
        },
        {
            id: "4",
            name: "Objectif Atteint",
            description: "Premier objectif complété",
            icon: "target",
            category: "Objectif",
            points: 50,
            unlockedBy: 156,
            color: "from-emerald-400 to-green-400"
        },
        {
            id: "5",
            name: "Ambassadeur",
            description: "Parrainer 5 nouveaux membres",
            icon: "crown",
            category: "Social",
            points: 200,
            unlockedBy: 12,
            color: "from-rose-400 to-pink-400"
        },
        {
            id: "6",
            name: "Éclair",
            description: "10km en moins de 40min",
            icon: "zap",
            category: "Performance",
            points: 120,
            unlockedBy: 34,
            color: "from-blue-400 to-indigo-400"
        }
    ];

    const stats = {
        total: achievements.length,
        totalPoints: achievements.reduce((sum, a) => sum + a.points, 0),
        totalUnlocks: achievements.reduce((sum, a) => sum + a.unlockedBy, 0),
        mostPopular: achievements.sort((a, b) => b.unlockedBy - a.unlockedBy)[0]
    };

    const getIcon = (iconName: string) => {
        const icons: Record<string, any> = {
            star: Star,
            trophy: Trophy,
            medal: Medal,
            target: Target,
            crown: Crown,
            zap: Zap
        };
        return icons[iconName] || Star;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Système de Récompenses
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Gérez les badges et achievements</p>
                    </div>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg">
                        <Plus className="h-5 w-5 mr-2" />
                        Nouvelle Récompense
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
                                <p className="text-sm font-medium text-gray-600">Total Badges</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Points Total</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Star className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalPoints}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Débloqués</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Trophy className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalUnlocks}</p>
                        </div>
                    </Card>

                    <Card className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-400 opacity-10 rounded-full -translate-y-8 translate-x-8" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium text-gray-600">Plus Populaire</p>
                                <div className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <Crown className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-lg font-bold text-gray-900">{stats.mostPopular.name}</p>
                        </div>
                    </Card>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => {
                        const IconComponent = getIcon(achievement.icon);
                        return (
                            <Card key={achievement.id} className="p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`h-16 w-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>
                                    <Badge variant={
                                        achievement.category === "Performance" ? "gold" :
                                            achievement.category === "Assiduité" ? "silver" :
                                                "bronze"
                                    }>
                                        {achievement.category}
                                    </Badge>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                                <div className="space-y-2 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Points:</span>
                                        <span className="font-bold text-yellow-600">{achievement.points} pts</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Débloqué par:</span>
                                        <span className="font-bold text-gray-900">{achievement.unlockedBy} membres</span>
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

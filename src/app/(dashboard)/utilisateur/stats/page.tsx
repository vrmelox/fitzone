"use client";

import {
    Activity,
    TrendingUp,
    Calendar,
    Clock,
    Target,
    Trophy,
    Flame,
    Dumbbell,
    Heart,
    Zap
} from "lucide-react";
import { Card, Badge, GradientButton } from "@/components/ui/dashboard-components";

export default function StatsPage() {
    return (
        <div className="p-4 lg:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mes Statistiques</h1>
                    <p className="text-gray-600">Analysez vos performances et votre progression</p>
                </div>
                <GradientButton>
                    <Calendar className="h-4 w-4 mr-2" />
                    Cette Semaine
                </GradientButton>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50" glow>
                    <div className="flex items-center justify-between mb-2">
                        <Activity className="h-8 w-8 text-teal-600" />
                        <Badge variant="success" size="xs">+12%</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">14</div>
                    <div className="text-sm text-gray-600">Visites ce mois</div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50" glow>
                    <div className="flex items-center justify-between mb-2">
                        <Clock className="h-8 w-8 text-purple-600" />
                        <Badge variant="default" size="xs">Moyenne</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">1h 15m</div>
                    <div className="text-sm text-gray-600">Temps d'entraînement</div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50" glow>
                    <div className="flex items-center justify-between mb-2">
                        <Flame className="h-8 w-8 text-orange-600" />
                        <Badge variant="fire" size="xs">Record</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">12.5k</div>
                    <div className="text-sm text-gray-600">Calories brûlées</div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-cyan-50 to-sky-50" glow>
                    <div className="flex items-center justify-between mb-2">
                        <Trophy className="h-8 w-8 text-cyan-600" />
                        <Badge variant="premium" size="xs">Top 10%</Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">42</div>
                    <div className="text-sm text-gray-600">Objectifs atteints</div>
                </Card>
            </div>

            {/* Activity Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Répartition de l'Activité</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-teal-50 rounded-lg">
                                    <Dumbbell className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">Musculation</div>
                                    <div className="text-xs text-gray-500">12 sessions</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gray-900">45%</div>
                                <div className="text-xs text-gray-500">15h total</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-pink-50 rounded-lg">
                                    <Heart className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">Cardio</div>
                                    <div className="text-xs text-gray-500">8 sessions</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gray-900">30%</div>
                                <div className="text-xs text-gray-500">10h total</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <Zap className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">HIIT</div>
                                    <div className="text-xs text-gray-500">5 sessions</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gray-900">25%</div>
                                <div className="text-xs text-gray-500">8h total</div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Progression Mensuelle</h3>
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                                <div
                                    className="w-full bg-teal-100 rounded-t-lg transition-all duration-500 hover:bg-teal-200 relative group"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {height}h
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

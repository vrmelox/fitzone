"use client";

import { MapPin, Info } from "lucide-react";
import { Card, Badge } from "@/components/ui/dashboard-components";

export default function MapPage() {
    return (
        <div className="p-4 lg:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Plan de la Salle</h1>
                    <p className="text-gray-600">Découvrez nos espaces d'entraînement</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 bg-gray-100 min-h-[500px] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                        <div className="text-center relative z-10">
                            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">Carte interactive bientôt disponible</p>
                            <Badge variant="warning" className="mt-2">En construction</Badge>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <Info className="h-5 w-5 text-teal-500 mr-2" />
                            Zones Disponibles
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="h-3 w-3 bg-teal-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700">Cardio</span>
                                </div>
                                <Badge variant="success" size="xs">Peu fréquenté</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700">Musculation</span>
                                </div>
                                <Badge variant="warning" size="xs">Moyen</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700">CrossFit</span>
                                </div>
                                <Badge variant="danger" size="xs">Très fréquenté</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="h-3 w-3 bg-pink-500 rounded-full"></div>
                                    <span className="font-medium text-gray-700">Yoga / Pilates</span>
                                </div>
                                <Badge variant="success" size="xs">Libre</Badge>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50">
                        <h3 className="font-bold text-gray-900 mb-2">Horaires d'Affluence</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Planifiez votre séance pour éviter la foule.
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>06h</span>
                                <span>12h</span>
                                <span>18h</span>
                                <span>23h</span>
                            </div>
                            <div className="h-16 flex items-end space-x-1">
                                {[20, 30, 50, 40, 60, 80, 90, 100, 80, 60, 40, 20].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-teal-200 rounded-t-sm hover:bg-teal-400 transition-colors"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                ))}
                            </div>
                            <div className="text-center text-xs font-medium text-teal-600 mt-2">
                                Pic d'affluence à 18h30
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

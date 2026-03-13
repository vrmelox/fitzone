"use client";

import { User, Mail, Phone, MapPin, Edit, Camera } from "lucide-react";
import { Card, Badge, GradientButton } from "@/components/ui/dashboard-components";

export default function ProfilePage() {
    return (
        <div className="p-4 lg:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
                    <p className="text-gray-600">Gérez vos informations personnelles</p>
                </div>
                <GradientButton variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                </GradientButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="p-6 flex flex-col items-center text-center lg:col-span-1">
                    <div className="relative mb-4">
                        <div className="h-32 w-32 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-lg">
                            S
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Sarah Connor</h2>
                    <p className="text-gray-500 mb-4">Membre depuis 2023</p>
                    <Badge variant="premium" size="md">Membre Premium</Badge>

                    <div className="w-full mt-6 pt-6 border-t border-gray-100 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Âge</span>
                            <span className="font-medium text-gray-900">29 ans</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Poids</span>
                            <span className="font-medium text-gray-900">65 kg</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taille</span>
                            <span className="font-medium text-gray-900">170 cm</span>
                        </div>
                    </div>
                </Card>

                {/* Details Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-gray-900 mb-6">Coordonnées</h3>
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                                    <Mail className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Email</div>
                                    <div className="font-medium text-gray-900">sarah.connor@email.com</div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                                    <Phone className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Téléphone</div>
                                    <div className="font-medium text-gray-900">+33 6 12 34 56 78</div>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-white rounded-lg mr-4 shadow-sm">
                                    <MapPin className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Adresse</div>
                                    <div className="font-medium text-gray-900">123 Rue de la République, 75001 Paris</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold text-gray-900 mb-6">Objectifs Principaux</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="default">Perte de poids</Badge>
                            <Badge variant="default">Tonification</Badge>
                            <Badge variant="default">Cardio</Badge>
                            <Badge variant="default">Santé</Badge>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

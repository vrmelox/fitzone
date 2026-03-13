"use client";

import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Edit,
    Camera,
    Save
} from "lucide-react";

// Components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" }) => {
    const variants = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800"
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 bg-white rounded-full p-1 shadow-2xl">
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                                A
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-teal-600 transition-colors">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold mb-2">Admin User</h1>
                        <p className="text-teal-100 mb-4">Super Administrateur</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Badge variant="success">Compte Actif</Badge>
                            <Badge variant="warning">Accès Complet</Badge>
                        </div>
                    </div>

                    <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition-all flex items-center gap-2">
                        <Edit className="h-5 w-5" />
                        Modifier le profil
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="h-5 w-5 text-teal-500" />
                            Informations Personnelles
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Nom complet</label>
                                <input
                                    type="text"
                                    defaultValue="Admin User"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        defaultValue="admin@gogym.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Téléphone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        defaultValue="+229 01 96 12 34 56"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Localisation</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        defaultValue="Cotonou, Bénin"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg flex items-center gap-2">
                                <Save className="h-5 w-5" />
                                Enregistrer les modifications
                            </button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-purple-500" />
                            Sécurité
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="font-medium text-gray-900">Mot de passe</p>
                                    <p className="text-sm text-gray-500">Dernière modification il y a 3 mois</p>
                                </div>
                                <button className="text-teal-600 font-medium hover:text-teal-700">Modifier</button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="font-medium text-gray-900">Double authentification (2FA)</p>
                                    <p className="text-sm text-gray-500">Sécurisez votre compte</p>
                                </div>
                                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-teal-500">
                                    <span className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Side Info */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Détails du compte</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Membre depuis</span>
                                <span className="font-medium text-gray-900">Janvier 2024</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Dernière connexion</span>
                                <span className="font-medium text-gray-900">Aujourd'hui, 09:41</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

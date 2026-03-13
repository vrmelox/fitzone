"use client";

import { useState } from "react";
import {
    Settings as SettingsIcon,
    Building,
    Clock,
    Mail,
    Phone,
    MapPin,
    DollarSign,
    Users,
    Bell,
    Shield,
    Save
} from "lucide-react";

const Card = ({ children, className = "", title }: { children: React.ReactNode; className?: string; title?: string }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {title && (
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            </div>
        )}
        {children}
    </div>
);

export default function ParametresPage() {
    const [settings, setSettings] = useState({
        gymName: "Gogym",
        email: "contact@gogym.com",
        phone: "+33 1 23 45 67 89",
        address: "123 Rue du Sport, 75001 Paris",
        openingHours: "Lun-Ven: 6h-22h, Sam-Dim: 8h-20h",
        basicPrice: 29.99,
        premiumPrice: 49.99,
        vipPrice: 79.99,
        maxCapacity: 50,
        emailNotifications: true,
        smsNotifications: false,
        autoRenewal: true
    });

    const handleSave = () => {
        // Save settings logic here
        alert("Paramètres sauvegardés avec succès !");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Paramètres
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Configurez votre salle de sport</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Sauvegarder
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* General Settings */}
                <Card title="Informations Générales">
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Building className="inline h-4 w-4 mr-2" />
                                Nom de la salle
                            </label>
                            <input
                                type="text"
                                value={settings.gymName}
                                onChange={(e) => setSettings({ ...settings, gymName: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="inline h-4 w-4 mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="inline h-4 w-4 mr-2" />
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="inline h-4 w-4 mr-2" />
                                Adresse
                            </label>
                            <input
                                type="text"
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Clock className="inline h-4 w-4 mr-2" />
                                Horaires d'ouverture
                            </label>
                            <input
                                type="text"
                                value={settings.openingHours}
                                onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </Card>

                {/* Pricing */}
                <Card title="Tarification">
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="inline h-4 w-4 mr-2" />
                                    Abonnement Basic
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.basicPrice}
                                    onChange={(e) => setSettings({ ...settings, basicPrice: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="inline h-4 w-4 mr-2" />
                                    Abonnement Premium
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.premiumPrice}
                                    onChange={(e) => setSettings({ ...settings, premiumPrice: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="inline h-4 w-4 mr-2" />
                                    Abonnement VIP
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.vipPrice}
                                    onChange={(e) => setSettings({ ...settings, vipPrice: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Capacity */}
                <Card title="Capacité">
                    <div className="p-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Users className="inline h-4 w-4 mr-2" />
                                Capacité maximale
                            </label>
                            <input
                                type="number"
                                value={settings.maxCapacity}
                                onChange={(e) => setSettings({ ...settings, maxCapacity: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                            />
                            <p className="text-sm text-gray-500 mt-2">Nombre maximum de personnes autorisées simultanément</p>
                        </div>
                    </div>
                </Card>

                {/* Notifications */}
                <Card title="Notifications">
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-600 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900">Notifications par email</p>
                                    <p className="text-sm text-gray-500">Recevoir les alertes par email</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-gray-600 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900">Notifications par SMS</p>
                                    <p className="text-sm text-gray-500">Recevoir les alertes par SMS</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications}
                                    onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center">
                                <Shield className="h-5 w-5 text-gray-600 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900">Renouvellement automatique</p>
                                    <p className="text-sm text-gray-500">Renouveler automatiquement les abonnements</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.autoRenewal}
                                    onChange={(e) => setSettings({ ...settings, autoRenewal: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                            </label>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

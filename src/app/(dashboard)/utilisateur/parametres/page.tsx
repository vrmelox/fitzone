"use client";

import {
    User,
    Bell,
    Lock,
    CreditCard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Moon,
    Globe
} from "lucide-react";
import { Card, Badge } from "@/components/ui/dashboard-components";

const SettingItem = ({
    icon: Icon,
    title,
    description,
    action
}: {
    icon: any;
    title: string;
    description: string;
    action?: React.ReactNode;
}) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
        <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
        {action || <ChevronRight className="h-5 w-5 text-gray-400" />}
    </div>
);

export default function SettingsPage() {
    return (
        <div className="p-4 lg:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
                    <p className="text-gray-600">Gérez vos préférences et votre compte</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-2">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Compte</h2>
                        <SettingItem
                            icon={User}
                            title="Informations Personnelles"
                            description="Nom, email, téléphone"
                        />
                        <SettingItem
                            icon={Lock}
                            title="Sécurité & Connexion"
                            description="Mot de passe, 2FA"
                        />
                        <SettingItem
                            icon={CreditCard}
                            title="Moyens de Paiement"
                            description="Cartes enregistrées, factures"
                        />
                    </Card>

                    <Card className="p-2">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Préférences</h2>
                        <SettingItem
                            icon={Bell}
                            title="Notifications"
                            description="Emails, push, SMS"
                            action={<Badge variant="success">Activé</Badge>}
                        />
                        <SettingItem
                            icon={Moon}
                            title="Apparence"
                            description="Thème sombre, couleurs"
                        />
                        <SettingItem
                            icon={Globe}
                            title="Langue"
                            description="Français (FR)"
                        />
                    </Card>

                    <Card className="p-2">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Support</h2>
                        <SettingItem
                            icon={HelpCircle}
                            title="Aide & Contact"
                            description="FAQ, support client"
                        />
                        <div className="border-t border-gray-100 mt-2">
                            <div className="flex items-center justify-between p-4 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-red-600">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <LogOut className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Déconnexion</h3>
                                        <p className="text-sm text-red-400">Se déconnecter de tous les appareils</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                        <h3 className="font-bold text-lg mb-2">Besoin d'aide ?</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Notre équipe est disponible 7j/7 pour répondre à vos questions.
                        </p>
                        <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                            Contacter le Support
                        </button>
                    </Card>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>Version 2.4.0</p>
                        <p>© 2024 Gogym. Tous droits réservés.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

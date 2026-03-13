"use client";

import { CreditCard, CheckCircle, Download, Clock, AlertCircle } from "lucide-react";
import { Card, Badge, GradientButton } from "@/components/ui/dashboard-components";

export default function SubscriptionPage() {
    return (
        <div className="p-4 lg:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mon Abonnement</h1>
                    <p className="text-gray-600">Gérez votre formule et vos paiements</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Plan */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-teal-500 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <Badge variant="premium" className="mb-2">Formule Actuelle</Badge>
                                    <h2 className="text-3xl font-bold">Premium Access</h2>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">32.790 F CFA</div>
                                    <div className="text-gray-400 text-sm">/ mois</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" />
                                    <span>Accès illimité 24/7</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" />
                                    <span>Tous les cours collectifs</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" />
                                    <span>Accès espace Spa & Sauna</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" />
                                    <span>Invité gratuit (1x/mois)</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <Clock className="h-4 w-4" />
                                    <span>Renouvellement le 24 Décembre 2025</span>
                                </div>
                                <button className="text-sm font-medium hover:text-white text-gray-300 transition-colors">
                                    Gérer l'abonnement
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Payment Method */}
                    <Card className="p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Moyen de Paiement</h3>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                                    <CreditCard className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">Visa terminant par 4242</div>
                                    <div className="text-sm text-gray-500">Expire le 12/26</div>
                                </div>
                            </div>
                            <GradientButton variant="outline" size="sm">Modifier</GradientButton>
                        </div>
                    </Card>
                </div>

                {/* Invoices */}
                <div>
                    <Card className="p-6 h-full">
                        <h3 className="font-bold text-gray-900 mb-4">Historique de Facturation</h3>
                        <div className="space-y-4">
                            {[
                                { date: "24 Nov 2025", amount: "32.790 F CFA", status: "Payé" },
                                { date: "24 Oct 2025", amount: "32.790 F CFA", status: "Payé" },
                                { date: "24 Sep 2025", amount: "32.790 F CFA", status: "Payé" },
                                { date: "24 Aou 2025", amount: "32.790 F CFA", status: "Payé" },
                            ].map((invoice, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
                                    <div>
                                        <div className="font-medium text-gray-900">{invoice.date}</div>
                                        <div className="text-xs text-green-600 flex items-center">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            {invoice.status}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">{invoice.amount}</div>
                                        <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-600 ml-auto mt-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 text-sm text-teal-600 font-medium hover:underline">
                            Voir tout l'historique
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

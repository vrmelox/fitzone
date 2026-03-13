"use client";

import React from 'react';
import {
    CheckCircle,
    AlertCircle,
    X,
    Shield,
    Star,
    CreditCard,
    Activity,
    Phone,
    Award
} from 'lucide-react';

interface Member {
    id: string;
    name: string;
    status: 'Actif' | 'Expiré' | 'Suspendu';
    lastVisit: string;
    phone: string;
    email: string;
    membershipType: string;
    startDate: string;
    endDate: string;
    remainingDays: number;
    visits: number;
    photo: string;
    healthInfo?: string;
    goals?: string[];
}

interface CheckInPopupProps {
    member: Member | null;
    onClose: () => void;
}

export const CheckInPopup: React.FC<CheckInPopupProps> = ({ member, onClose }) => {
    if (!member) return null;

    const isValid = member.status === 'Actif' && member.remainingDays > 0;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className={`p-6 ${isValid ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20'}`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {isValid ? (
                                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                                    <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                                </div>
                            ) : (
                                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                                    <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
                                </div>
                            )}
                            <div>
                                <h2 className={`text-2xl font-bold ${isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                                    {isValid ? 'Accès autorisé' : 'Accès refusé'}
                                </h2>
                                <p className={`${isValid ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}>
                                    {isValid
                                        ? `${member.remainingDays} jours restants`
                                        : member.status === 'Expiré'
                                            ? 'Abonnement expiré'
                                            : 'Abonnement suspendu'
                                    }
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200 dark:border-gray-600"
                                />
                                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center ${member.status === 'Actif' ? 'bg-green-500' : member.status === 'Expiré' ? 'bg-red-500' : 'bg-orange-500'
                                    }`}>
                                    <Shield size={16} className="text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{member.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">ID: {member.id}</p>

                            <div className="mt-4 flex justify-center">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${member.status === 'Actif'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                                    : member.status === 'Expiré'
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                                    }`}>
                                    <Star size={14} />
                                    {member.status}
                                </span>
                            </div>

                            {member.healthInfo && (
                                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                                        <AlertCircle size={16} />
                                        {member.healthInfo}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <CreditCard size={18} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">Abonnement</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 font-semibold">{member.membershipType}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Du {new Date(member.startDate).toLocaleDateString('fr-FR')} au {new Date(member.endDate).toLocaleDateString('fr-FR')}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity size={18} className="text-purple-600 dark:text-purple-400" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">Activité</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 font-semibold">{member.visits} visites</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Dernière visite: {new Date(member.lastVisit).toLocaleDateString('fr-FR')}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone size={18} className="text-green-600 dark:text-green-400" />
                                    <span className="font-medium text-gray-800 dark:text-gray-200">Contact</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 font-semibold">{member.phone}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                            </div>

                            {member.goals && member.goals.length > 0 && (
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award size={18} className="text-indigo-600 dark:text-indigo-400" />
                                        <span className="font-medium text-gray-800 dark:text-gray-200">Objectifs</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {member.goals.map((goal, index) => (
                                            <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                                                {goal}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex gap-3 justify-center">
                            {isValid ? (
                                <>
                                    <button
                                        onClick={() => {
                                            // Logic for check-in
                                            onClose();
                                        }}
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 font-medium shadow-lg"
                                    >
                                        Confirmer l'entrée
                                    </button>
                                    <button className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-8 py-3 rounded-xl hover:from-gray-700 hover:to-slate-700 transition-all transform hover:scale-105 font-medium shadow-lg">
                                        Marquer la sortie
                                    </button>
                                </>
                            ) : (
                                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 font-medium shadow-lg">
                                    Renouveler l'abonnement
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export type { Member, CheckInPopupProps };

"use client";

import { Mail, Phone, User, Shield, Briefcase, Calendar } from "lucide-react";

interface AddPersonFormProps {
    type: "member" | "staff";
    onClose: () => void;
}

export const AddPersonForm = ({ type, onClose }: AddPersonFormProps) => {
    const isStaff = type === "staff";

    return (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nom complet</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ex: Jean Dupont"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Ex: jean.dupont@email.com"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="tel"
                            placeholder="Ex: 06 12 34 56 78"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Role / Membership Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        {isStaff ? "Rôle" : "Type d'abonnement"}
                    </label>
                    <div className="relative">
                        {isStaff ? (
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        ) : (
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        )}
                        <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none">
                            {isStaff ? (
                                <>
                                    <option value="coach">Coach</option>
                                    <option value="receptionist">Réceptionniste</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="admin">Administrateur</option>
                                </>
                            ) : (
                                <>
                                    <option value="basic">Basic</option>
                                    <option value="premium">Premium</option>
                                    <option value="vip">VIP</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                {/* Start Date (Optional, could default to today) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date de début</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-lg shadow-md transition-all"
                >
                    {isStaff ? "Ajouter le membre" : "Créer l'abonnement"}
                </button>
            </div>
        </form>
    );
};

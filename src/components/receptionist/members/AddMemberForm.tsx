"use client";

import React, { useState } from 'react';
import {
    X,
    User,
    Mail,
    Phone,
    Calendar,
    CreditCard,
    MapPin,
    Camera,
    AlertCircle
} from 'lucide-react';

interface AddMemberFormProps {
    onClose: () => void;
    onSubmit: (memberData: NewMemberData) => void;
}

export interface NewMemberData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    postalCode: string;
    membershipType: string;
    startDate: string;
    emergencyContact: string;
    emergencyPhone: string;
    photo?: string;
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState<NewMemberData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        postalCode: '',
        membershipType: 'mensuel',
        startDate: new Date().toISOString().split('T')[0],
        emergencyContact: '',
        emergencyPhone: '',
        photo: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof NewMemberData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof NewMemberData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof NewMemberData, string>> = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
        if (!formData.email.trim()) {
            newErrors.email = 'Email requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date de naissance requise';
        if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Contact d\'urgence requis';
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Téléphone d\'urgence requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                                <User size={24} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Nouveau membre</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Remplissez les informations du nouveau membre</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X size={24} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                <User size={20} />
                                Informations personnelles
                            </h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Prénom *
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                placeholder="Jean"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nom *
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                placeholder="Dupont"
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.lastName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                    placeholder="jean.dupont@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Téléphone *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                    placeholder="06 12 34 56 78"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date de naissance *
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                />
                            </div>
                            {errors.dateOfBirth && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.dateOfBirth}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-4 flex items-center gap-2">
                                <MapPin size={20} />
                                Adresse
                            </h3>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Adresse
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="123 Rue de la Paix"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Ville
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Paris"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Code postal
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="75001"
                            />
                        </div>

                        {/* Membership */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-4 flex items-center gap-2">
                                <CreditCard size={20} />
                                Abonnement
                            </h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Type d'abonnement *
                            </label>
                            <select
                                name="membershipType"
                                value={formData.membershipType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="mensuel">Mensuel - 32.150 F CFA/mois</option>
                                <option value="trimestriel">Trimestriel - 84.620 F CFA/3 mois</option>
                                <option value="semestriel">Semestriel - 156.780 F CFA/6 mois</option>
                                <option value="annuel">Annuel - 294.540 F CFA/an</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date de début
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Emergency Contact */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-4 flex items-center gap-2">
                                <Phone size={20} />
                                Contact d'urgence
                            </h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nom du contact *
                            </label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                placeholder="Marie Dupont"
                            />
                            {errors.emergencyContact && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.emergencyContact}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Téléphone d'urgence *
                            </label>
                            <input
                                type="tel"
                                name="emergencyPhone"
                                value={formData.emergencyPhone}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                placeholder="06 98 76 54 32"
                            />
                            {errors.emergencyPhone && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.emergencyPhone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                        >
                            Créer le membre
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

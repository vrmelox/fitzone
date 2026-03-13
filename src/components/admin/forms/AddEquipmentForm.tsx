"use client";

import { Dumbbell, MapPin, Calendar, Wrench, AlertCircle } from "lucide-react";

interface AddEquipmentFormProps {
    onClose: () => void;
}

export const AddEquipmentForm = ({ onClose }: AddEquipmentFormProps) => {
    return (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nom de l'équipement</label>
                    <div className="relative">
                        <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ex: Tapis de course Pro X1"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Catégorie</label>
                    <div className="relative">
                        <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none">
                            <option value="cardio">Cardio</option>
                            <option value="musculation">Musculation</option>
                            <option value="crossfit">Crossfit</option>
                            <option value="accessoire">Accessoire</option>
                        </select>
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Emplacement</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ex: Zone Cardio A"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">État initial</label>
                    <div className="relative">
                        <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none">
                            <option value="disponible">Disponible</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="hors_service">Hors service</option>
                        </select>
                    </div>
                </div>

                {/* Next Maintenance */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Prochaine maintenance</label>
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
                    Ajouter l'équipement
                </button>
            </div>
        </form>
    );
};

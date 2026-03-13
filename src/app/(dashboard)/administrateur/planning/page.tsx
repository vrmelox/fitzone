"use client";

import { useState } from "react";
import {
    Calendar as CalendarIcon,
    Plus,
    ChevronLeft,
    ChevronRight,
    Clock,
    Users,
    MapPin,
    Edit,
    Trash2
} from "lucide-react";

interface ClassEvent {
    id: string;
    title: string;
    instructor: string;
    time: string;
    duration: string;
    room: string;
    capacity: number;
    enrolled: number;
    color: string;
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
        {children}
    </div>
);

export default function PlanningPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<"week" | "day">("week");

    const classes: ClassEvent[] = [
        {
            id: "1",
            title: "Yoga Matinal",
            instructor: "Marie Dupont",
            time: "08:00",
            duration: "1h",
            room: "Salle A",
            capacity: 20,
            enrolled: 15,
            color: "from-purple-400 to-pink-400"
        },
        {
            id: "2",
            title: "CrossFit",
            instructor: "Thomas Bernard",
            time: "10:00",
            duration: "1h30",
            room: "Salle B",
            capacity: 15,
            enrolled: 15,
            color: "from-teal-400 to-cyan-400"
        },
        {
            id: "3",
            title: "Pilates",
            instructor: "Sophie Laurent",
            time: "14:00",
            duration: "1h",
            room: "Salle A",
            capacity: 20,
            enrolled: 12,
            color: "from-yellow-400 to-orange-400"
        },
        {
            id: "4",
            title: "Spinning",
            instructor: "Marie Dupont",
            time: "18:00",
            duration: "45min",
            room: "Salle C",
            capacity: 25,
            enrolled: 22,
            color: "from-rose-400 to-pink-400"
        }
    ];

    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7h à 20h

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Planning des Cours
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Gérez les horaires et les réservations</p>
                    </div>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg">
                        <Plus className="h-5 w-5 mr-2" />
                        Nouveau Cours
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Calendar Controls */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronLeft className="h-5 w-5 text-gray-600" />
                            </button>
                            <h2 className="text-xl font-bold text-gray-900">
                                Semaine du {currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </h2>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setView("day")}
                                className={`px-4 py-2 rounded-lg transition-all ${view === "day"
                                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                Jour
                            </button>
                            <button
                                onClick={() => setView("week")}
                                className={`px-4 py-2 rounded-lg transition-all ${view === "week"
                                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                Semaine
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Classes List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {classes.map((classEvent) => (
                        <Card key={classEvent.id} className="p-6 hover:shadow-xl transition-shadow">
                            <div className={`h-2 w-full bg-gradient-to-r ${classEvent.color} rounded-full mb-4`} />

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{classEvent.title}</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {classEvent.time} - {classEvent.duration}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Users className="h-4 w-4 mr-2" />
                                    {classEvent.instructor}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {classEvent.room}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-600">Inscriptions</span>
                                    <span className="font-bold text-gray-900">
                                        {classEvent.enrolled}/{classEvent.capacity}
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${classEvent.color} rounded-full`}
                                        style={{ width: `${(classEvent.enrolled / classEvent.capacity) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all text-sm font-medium">
                                    <Edit className="h-4 w-4 inline mr-1" />
                                    Modifier
                                </button>
                                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Trash2 className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

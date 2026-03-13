"use client";

import { Calendar, Clock, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, Badge, GradientButton } from "@/components/ui/dashboard-components";

export default function PlanningPage() {
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const dates = [24, 25, 26, 27, 28, 29, 30];

    const classes = [
        {
            id: 1,
            name: "Yoga Sunrise",
            time: "07:00 - 08:00",
            instructor: "Sophie Martin",
            room: "Studio Zen",
            category: "Bien-être",
            level: "Tous niveaux",
            spots: 5
        },
        {
            id: 2,
            name: "BodyPump",
            time: "12:30 - 13:15",
            instructor: "Thomas Wilson",
            room: "Salle Principale",
            category: "Renforcement",
            level: "Intermédiaire",
            spots: 12
        },
        {
            id: 3,
            name: "CrossFit WOD",
            time: "18:00 - 19:00",
            instructor: "Marc Dubois",
            room: "Box CrossFit",
            category: "Intensif",
            level: "Avancé",
            spots: 0
        },
        {
            id: 4,
            name: "Zumba",
            time: "19:30 - 20:30",
            instructor: "Julie Roux",
            room: "Salle Danse",
            category: "Cardio",
            level: "Débutant",
            spots: 8
        }
    ];

    return (
        <div className="p-4 lg:p-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Planning & Cours</h1>
                    <p className="text-gray-600">Réservez vos séances de la semaine</p>
                </div>
                <div className="flex space-x-2">
                    <GradientButton variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer
                    </GradientButton>
                    <GradientButton>
                        Mon Planning
                    </GradientButton>
                </div>
            </div>

            {/* Calendar Strip */}
            <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="font-bold text-gray-900">Novembre 2025</span>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => (
                        <div key={day} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">{day}</div>
                            <div className={`
                h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors
                ${index === 0 ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "hover:bg-gray-100 text-gray-900"}
              `}>
                                {dates[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Classes List */}
            <div className="space-y-4">
                <h2 className="font-bold text-lg text-gray-900">Cours Disponibles</h2>
                {classes.map((cls) => (
                    <Card key={cls.id} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-100 rounded-xl">
                                <span className="text-sm font-bold text-gray-900">{cls.time.split(" - ")[0]}</span>
                                <span className="text-xs text-gray-500">{cls.time.split(" - ")[1]}</span>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="font-bold text-gray-900">{cls.name}</h3>
                                    <Badge variant={
                                        cls.category === "Bien-être" ? "success" :
                                            cls.category === "Intensif" ? "danger" :
                                                "default"
                                    } size="xs">{cls.category}</Badge>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-1" />
                                        {cls.instructor}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {cls.room}
                                    </div>
                                    <div className="flex items-center">
                                        <Activity className="h-4 w-4 mr-1" />
                                        {cls.level}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4">
                            <div className="text-right">
                                <div className={`font-bold ${cls.spots === 0 ? "text-rose-500" : "text-teal-600"}`}>
                                    {cls.spots === 0 ? "Complet" : `${cls.spots} places`}
                                </div>
                                <div className="text-xs text-gray-500">restantes</div>
                            </div>
                            <GradientButton
                                disabled={cls.spots === 0}
                                variant={cls.spots === 0 ? "secondary" : "primary"}
                            >
                                {cls.spots === 0 ? "Sur liste d'attente" : "Réserver"}
                            </GradientButton>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

import { User, Activity } from "lucide-react";

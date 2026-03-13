"use client";

import Link from "next/link";
import HomeMenu from "@/components/layout/HomeMenu";
import Footer from "@/components/layout/Footer";
import { Target, Users, Award, Heart, Dumbbell, TrendingUp } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Passion",
        description: "Nous sommes passionnés par votre bien-être et votre transformation"
    },
    {
        icon: Users,
        title: "Communauté",
        description: "Une famille de plus de 150k membres qui s'entraident et se motivent"
    },
    {
        icon: Award,
        title: "Excellence",
        description: "Des équipements de pointe et des coachs certifiés pour votre réussite"
    },
    {
        icon: Target,
        title: "Résultats",
        description: "Des programmes personnalisés pour atteindre vos objectifs"
    }
];

const stats = [
    { number: "150k+", label: "Membres actifs" },
    { number: "50+", label: "Coachs certifiés" },
    { number: "15", label: "Années d'expérience" },
    { number: "98%", label: "Taux de satisfaction" }
];

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div
                className="bg-cover bg-center h-[70vh] relative"
                style={{ backgroundImage: 'url("/fitpushup.jpg")' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10">
                    <HomeMenu />

                    <div className="px-6 mt-[15%] max-w-7xl mx-auto text-center">
                        <h1 className="font-open font-bold text-4xl md:text-6xl text-white leading-tight mb-4">
                            À Propos de Gogym
                        </h1>
                        <p className="text-white/90 font-josefin text-lg md:text-xl max-w-[700px] mx-auto">
                            Votre partenaire de confiance pour une vie plus saine et plus active
                        </p>
                    </div>
                </div>
            </div>

            {/* Notre Histoire */}
            <section className="mt-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                Fondée en 2010, Gogym est née d'une vision simple : rendre le fitness accessible à tous,
                                quel que soit votre niveau ou vos objectifs.
                            </p>
                            <p>
                                Avec plus de 15 ans d'expérience, nous avons accompagné plus de 150 000 membres dans leur
                                transformation physique et mentale. Notre équipe de coachs certifiés et passionnés est
                                dédiée à votre réussite.
                            </p>
                            <p>
                                Aujourd'hui, Gogym est bien plus qu'une salle de sport : c'est une communauté,
                                un mode de vie, une famille qui partage les mêmes valeurs de dépassement de soi et de bien-être.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/work-1.jpg"
                                alt="Gogym Gym"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-[#15B5B0] text-white p-8 rounded-2xl shadow-xl">
                            <div className="text-4xl font-bold">15+</div>
                            <div className="text-sm">Années d'excellence</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nos Valeurs */}
            <section className="mt-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
                    <p className="text-gray-700 text-lg max-w-[600px] mx-auto">
                        Les principes qui guident notre mission et notre engagement envers vous
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                        >
                            <div className="bg-gradient-to-r from-[#15B5B0] to-[#0d9488] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <value.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Statistiques */}
            <section className="mt-32 px-6">
                <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#15B5B0] to-[#0d9488] rounded-3xl p-12 text-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2">
                                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
                                <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notre Mission */}
            <section className="mt-32 px-6 max-w-7xl mx-auto mb-20">
                <div className="bg-gray-50 rounded-3xl p-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <Dumbbell className="w-16 h-16 text-[#15B5B0] mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                            Inspirer et accompagner chaque personne dans sa quête d'une vie plus saine,
                            plus active et plus épanouie. Nous croyons que le fitness n'est pas seulement
                            une question de corps, mais aussi d'esprit et de communauté.
                        </p>
                        <Link
                            href="/register"
                            className="inline-block bg-[#15B5B0] hover:bg-[#0d9488] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Rejoignez-nous aujourd'hui
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

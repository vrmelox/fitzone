"use client";

import Link from "next/link";
import HomeMenu from "@/components/layout/HomeMenu";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
        alert("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div
                className="bg-cover bg-center h-[70vh] relative"
                style={{ backgroundImage: 'url("/homefit.jpg")' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10">
                    <HomeMenu />

                    <div className="px-6 mt-[10%] max-w-7xl mx-auto text-center">
                        <h1 className="font-open font-bold text-4xl md:text-6xl text-white leading-tight mb-4">
                            Contactez-nous
                        </h1>
                        <p className="text-white/90 font-josefin text-lg md:text-xl max-w-[700px] mx-auto">
                            Notre équipe est là pour répondre à toutes vos questions
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Info & Form */}
            <section className="mt-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Informations de Contact</h2>
                            <p className="text-gray-600 mb-8">
                                N'hésitez pas à nous contacter pour toute question ou demande d'information.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#15B5B0] p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Adresse</h3>
                                    <p className="text-gray-600">
                                        123 Avenue du Fitness<br />
                                        Cotonou, Bénin
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#15B5B0] p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Téléphone</h3>
                                    <p className="text-gray-600">
                                        +229 XX XX XX XX<br />
                                        +229 YY YY YY YY
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#15B5B0] p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">
                                        contact@gogym.bj<br />
                                        support@gogym.bj
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#15B5B0] p-3 rounded-full">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Horaires</h3>
                                    <p className="text-gray-600">
                                        Lun - Ven: 6h00 - 22h00<br />
                                        Sam - Dim: 8h00 - 20h00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom complet *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-transparent transition-all"
                                            placeholder="Votre nom"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-transparent transition-all"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-transparent transition-all"
                                            placeholder="+229 XX XX XX XX"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Sujet *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-transparent transition-all"
                                        >
                                            <option value="">Sélectionnez un sujet</option>
                                            <option value="information">Demande d'information</option>
                                            <option value="abonnement">Question sur les abonnements</option>
                                            <option value="cours">Renseignement sur les cours</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-transparent transition-all resize-none"
                                        placeholder="Votre message..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#15B5B0] hover:bg-[#0d9488] text-white font-bold py-4 px-6 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                                >
                                    <Send className="w-5 h-5" />
                                    Envoyer le message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="mt-20 px-6 max-w-7xl mx-auto mb-20">
                <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center">
                    <p className="text-gray-600 text-lg">Carte Google Maps à intégrer ici</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}

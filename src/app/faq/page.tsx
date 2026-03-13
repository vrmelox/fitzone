"use client";

import Link from "next/link";
import HomeMenu from "@/components/layout/HomeMenu";
import Footer from "@/components/layout/Footer";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        category: "Abonnements",
        questions: [
            {
                q: "Quels sont les différents types d'abonnements disponibles ?",
                a: "Nous proposons trois formules : Basic (5 000 F CFA/mois), Premium (25 000 F CFA/mois) et VIP (250 000 F CFA/an). Chaque formule offre des avantages différents adaptés à vos besoins."
            },
            {
                q: "Puis-je suspendre mon abonnement temporairement ?",
                a: "Oui, vous pouvez suspendre votre abonnement pour une durée maximale de 2 mois par an. Contactez notre équipe pour plus d'informations."
            },
            {
                q: "Comment puis-je résilier mon abonnement ?",
                a: "Vous pouvez résilier votre abonnement à tout moment en nous contactant au moins 30 jours avant la date de renouvellement."
            }
        ]
    },
    {
        category: "Cours et Entraînement",
        questions: [
            {
                q: "Dois-je réserver mes cours à l'avance ?",
                a: "Oui, nous recommandons de réserver vos cours via votre espace membre pour garantir votre place, surtout pour les cours populaires."
            },
            {
                q: "Les cours sont-ils adaptés aux débutants ?",
                a: "Absolument ! Nous proposons des cours pour tous les niveaux. Nos coachs adaptent les exercices selon votre niveau et vos capacités."
            },
            {
                q: "Puis-je avoir un coach personnel ?",
                a: "Oui, nos formules Premium et VIP incluent des séances avec un coach personnel. Vous pouvez également réserver des séances individuelles supplémentaires."
            }
        ]
    },
    {
        category: "Équipements et Installations",
        questions: [
            {
                q: "Quels équipements sont disponibles ?",
                a: "Nous disposons d'équipements de musculation, cardio, CrossFit, ainsi que des espaces dédiés au yoga, pilates et cours collectifs. Nous avons également un spa et un sauna."
            },
            {
                q: "Y a-t-il des vestiaires et des douches ?",
                a: "Oui, nous mettons à disposition des vestiaires modernes avec douches, casiers sécurisés et produits d'hygiène."
            },
            {
                q: "Puis-je apporter mon propre équipement ?",
                a: "Oui, vous pouvez apporter vos accessoires personnels (gants, ceinture, etc.). Cependant, tout l'équipement nécessaire est disponible sur place."
            }
        ]
    },
    {
        category: "Horaires et Accès",
        questions: [
            {
                q: "Quels sont vos horaires d'ouverture ?",
                a: "Nous sommes ouverts du lundi au vendredi de 6h à 22h, et le week-end de 8h à 20h. Les membres VIP bénéficient d'un accès 24h/24."
            },
            {
                q: "Comment accéder à la salle ?",
                a: "Vous recevrez une carte d'accès ou un code QR lors de votre inscription. Vous pouvez également utiliser notre application mobile pour le check-in."
            },
            {
                q: "Puis-je amener un invité ?",
                a: "Les membres Premium et VIP peuvent inviter un ami gratuitement une fois par mois. Des pass journaliers sont également disponibles à l'achat."
            }
        ]
    },
    {
        category: "Paiement et Facturation",
        questions: [
            {
                q: "Quels modes de paiement acceptez-vous ?",
                a: "Nous acceptons les paiements par carte bancaire, mobile money (MTN, Moov), et virement bancaire."
            },
            {
                q: "Y a-t-il des frais d'inscription ?",
                a: "Les frais d'inscription sont de 10 000 F CFA (payables une seule fois) et incluent votre carte d'accès et votre évaluation physique initiale."
            },
            {
                q: "Proposez-vous des réductions ?",
                a: "Oui, nous offrons des réductions pour les étudiants, les familles et les paiements annuels. Contactez-nous pour plus de détails."
            }
        ]
    },
    {
        category: "Santé et Sécurité",
        questions: [
            {
                q: "Dois-je passer un examen médical avant de m'inscrire ?",
                a: "Un certificat médical est recommandé mais non obligatoire. Nous effectuons une évaluation physique gratuite lors de votre inscription."
            },
            {
                q: "Que faire en cas de blessure ?",
                a: "Nos coachs sont formés aux premiers secours. En cas de blessure, informez immédiatement le personnel. Nous avons également une assurance pour nos membres."
            },
            {
                q: "Les installations sont-elles désinfectées régulièrement ?",
                a: "Oui, nous nettoyons et désinfectons tous les équipements plusieurs fois par jour pour garantir votre sécurité."
            }
        ]
    }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
            >
                <span className="font-medium text-gray-900 pr-4">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div
                className="bg-cover bg-center h-[50vh] relative"
                style={{ backgroundImage: 'url("/fitimage.jpg")' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10">
                    <HomeMenu />

                    <div className="px-6 mt-[10%] max-w-7xl mx-auto text-center">
                        <h1 className="font-open font-bold text-4xl md:text-6xl text-white leading-tight mb-4">
                            Questions Fréquentes
                        </h1>
                        <p className="text-white/90 font-josefin text-lg md:text-xl max-w-[700px] mx-auto">
                            Trouvez rapidement les réponses à vos questions
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <section className="mt-20 px-6 max-w-5xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <HelpCircle className="w-16 h-16 text-[#15B5B0] mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comment pouvons-nous vous aider ?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Consultez nos réponses aux questions les plus fréquentes
                    </p>
                </div>

                <div className="space-y-12">
                    {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-1 h-8 bg-[#15B5B0] rounded-full"></div>
                                {category.category}
                            </h3>
                            <div className="space-y-4">
                                {category.questions.map((faq, faqIndex) => (
                                    <FAQItem key={faqIndex} question={faq.q} answer={faq.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-gradient-to-r from-[#15B5B0] to-[#0d9488] rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">Vous n'avez pas trouvé votre réponse ?</h3>
                    <p className="text-white/90 mb-6">
                        Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-[#15B5B0] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                        Nous contacter
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

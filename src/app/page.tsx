"use client";

import Link from "next/link";
import HomeMenu from "@/components/layout/HomeMenu";
import { MoveUpRight, CheckCircle, Star, Users, Award } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/layout/Footer";

const programs = [
  {
    image: "/work-1.jpg",
    title: "Musculation",
    description: "Développez votre force et votre masse musculaire avec nos équipements de pointe",
    duration: "45-60 min",
    level: "Tous niveaux"
  },
  {
    image: "/work-2.jpg",
    title: "Cardio Training",
    description: "Améliorez votre endurance et brûlez des calories efficacement",
    duration: "30-45 min",
    level: "Débutant à avancé"
  },
  {
    image: "/work-3.jpg",
    title: "Cours Collectifs",
    description: "Entraînez-vous en groupe avec nos cours dynamiques et motivants",
    duration: "45 min",
    level: "Tous niveaux"
  }
];

const pricingPlans = [
  {
    name: "Basic",
    price: "5000",
    period: "mois",
    features: [
      "Accès salle de sport",
      "Casier personnel",
      "Douches",
      "Support client"
    ],
    popular: false
  },
  {
    name: "Premium",
    price: "25.000",
    period: "mois",
    features: [
      "Tout du plan Basic",
      "Cours collectifs illimités",
      "1 séance coach/mois",
      "Accès spa & sauna",
      "Nutrition conseils"
    ],
    popular: true
  },
  {
    name: "VIP",
    price: "250.000",
    period: "an",
    features: [
      "Tout du plan Premium",
      "Coach personnel dédié",
      "Programme personnalisé",
      "Accès 24h/24",
      "Invitations d'amis"
    ],
    popular: false
  }
];

const trainers = [
  {
    name: "Edouard Dossou",
    specialty: "Coach Fitness & Nutrition",
    image: "/coach-1.jpg",
    experience: "8 ans d'expérience",
    rating: 4.9
  },
  {
    name: "Silvia Yan",
    specialty: "Musculation & CrossFit",
    image: "/coach-2.jpg",
    experience: "12 ans d'expérience",
    rating: 4.8
  },
  {
    name: "Christ Tara",
    specialty: "Yoga & Pilates",
    image: "/coach-3.jpg",
    experience: "6 ans d'expérience",
    rating: 5.0
  }
];
export default function Home() {

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen relative"
        style={{ backgroundImage: 'url("/fitimage.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10">
          <HomeMenu />

          <div className="px-6 mt-[10%] max-w-7xl">
            <h1 className="font-open font-bold text-4xl md:text-6xl lg:text-8xl text-white leading-tight">
              Fitness & Health Training
            </h1>

            <div className="mt-8">
              <p className="text-white/90 font-josefin text-lg md:text-xl max-w-[700px] leading-relaxed mb-8">
                Gogym vous garantit un entraînement à la hauteur de vos attentes.
                Des coachs professionnels et un programme d'entraînement personnalisé.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/register" className="bg-[#e6bb00] cursor-pointer hover:bg-[#15B5B0] text-black font-bold py-4 px-6 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group w-fit">
                  Rejoignez-nous
                  <MoveUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {["/client-1.jpg", "/client-2.jpg", "/client-3.jpg", "/client-4.jpg"].map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`client-${index}`}
                        className="rounded-full w-10 h-10 border-2 border-[#15B5B0] object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-white/80 font-bold text-sm sm:text-base">
                    +150k clients satisfaits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre centrale - Activités */}
      <div className="mt-8 mx-4 bg-black rounded-2xl py-6 px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-white">
          {[
            "Running", "Marche", "Vélo", "Randonnée",
            "Exercice", "Fitness", "Course", "Boxe"
          ].map((text, index) => (
            <div key={index} className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
              <span className="text-lg md:text-xl font-medium">{text}</span>
              {<FontAwesomeIcon icon={faFire} className="text-[#e6bb00] text-sm" />}
            </div>
          ))}
        </div>
      </div>

      {/* Section Nos Programmes */}
      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center font-open flex flex-col justify-center items-center mb-12">
          <h2 className="text-gray-900 text-4xl md:text-6xl font-bold mb-4 font-open">Nos Programmes</h2>
          <p className="text-gray-800 text-lg max-w-[600px] text-center leading-relaxed">
            Améliorez votre routine grâce à notre bibliothèque croissante d'entraînements
            dirigés par nos entraîneurs de classe mondiale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${program.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">{program.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-[#e6bb00] text-black px-3 py-1 rounded-full font-medium">
                    {program.duration}
                  </span>
                  <span className="text-white/80">{program.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Tarifs */}
      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Nos Tarifs</h2>
          <p className="text-gray-800 text-lg max-w-[600px] mx-auto">
            Choisissez l'abonnement qui correspond à vos objectifs et votre style de vie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${plan.popular
                ? 'bg-gradient-to-b from-[#15B5B0] to-[#0d9488] text-white shadow-xl'
                : 'bg-white border-2 border-gray-100 hover:border-[#15B5B0]/30 shadow-lg'
              }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#e6bb00] text-black px-4 py-2 rounded-full text-sm font-bold">
                    Plus populaire
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}F CFA
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 cursor-pointer">
                    <CheckCircle className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-[#15B5B0]'
                      }`} />
                    <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-full font-bold transition-all duration-300 ${plan.popular
                  ? 'bg-white text-[#15B5B0] hover:bg-gray-100'
                  : 'bg-[#15B5B0] text-white hover:bg-[#0d9488]'
                }`}>
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section Nos Coachs */}
      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Nos Coachs</h2>
          <p className="text-gray-800 text-lg max-w-[600px] mx-auto">
            Une équipe de professionnels passionnés pour vous accompagner vers vos objectifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative aspect-[4/5] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${trainer.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{trainer.name}</h3>
                <p className="text-[#15B5B0] font-medium mb-2">{trainer.specialty}</p>
                <p className="text-gray-600 text-sm mb-3">{trainer.experience}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#e6bb00] fill-current" />
                    <span className="text-gray-900 font-medium">{trainer.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Rejoindre le Club */}
      <section className="mt-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#15B5B0] to-[#0d9488] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">#JoinTheClub</h2>
            <p className="text-white/90 text-lg mb-8 max-w-[600px] mx-auto">
              Rejoignez notre communauté de passionnés de fitness et transformez votre vie dès aujourd'hui
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <span className="font-medium">+150k membres actifs</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6" />
                <span className="font-medium">Certifié excellence</span>
              </div>
            </div>

            <button className="bg-[#e6bb00] cursor-pointer hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
              Commencer maintenant
              <MoveUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    membershipType: "basic",
    agreeTerms: false,
    agreeNewsletter: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const membershipPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "19.670 F CFA/mois",
      features: ["Accès salle", "Casier", "Douches"],
      color: "border-gray-300"
    },
    {
      id: "premium",
      name: "Premium",
      price: "32.790 F CFA/mois",
      features: ["Tout Basic", "Cours collectifs", "1 séance coach/mois"],
      color: "border-[#15B5B0]",
      popular: true
    },
    {
      id: "vip",
      name: "VIP",
      price: "52.470 F CFA/mois",
      features: ["Tout Premium", "Coach personnel", "Accès 24h/24"],
      color: "border-[#e6bb00]"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'appel API
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register:", formData);
    }, 2000);
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.phone;
  const isStep2Valid = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-[#15B5B0]">Gogym</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rejoignez Gogym</h2>
          <p className="text-gray-600">Créez votre compte et commencez votre transformation</p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step <= currentStep
                  ? 'bg-[#15B5B0] text-white'
                  : 'bg-gray-200 text-gray-500'
                  }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 transition-colors ${step < currentStep ? 'bg-[#15B5B0]' : 'bg-gray-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-2">
            <span className={`text-xs ${currentStep >= 1 ? 'text-[#15B5B0]' : 'text-gray-500'}`}>
              Informations
            </span>
            <span className={`text-xs ${currentStep >= 2 ? 'text-[#15B5B0]' : 'text-gray-500'}`}>
              Sécurité
            </span>
            <span className={`text-xs ${currentStep >= 3 ? 'text-[#15B5B0]' : 'text-gray-500'}`}>
              Abonnement
            </span>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
                  <p className="text-sm text-gray-600">Dites-nous qui vous êtes</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-[#15B5B0] transition-colors"
                        placeholder="Karlio"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-[#15B5B0] transition-colors"
                        placeholder="Roden"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-[#15B5B0] transition-colors"
                      placeholder="rodkarli@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-[#15B5B0] transition-colors"
                      placeholder="+229 01 23 45 67 89"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                  className="w-full bg-[#15B5B0] hover:bg-[#0d9488] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Étape 2: Sécurité */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Sécurité du compte</h3>
                  <p className="text-sm text-gray-600">Créez un mot de passe sécurisé</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-[#15B5B0] transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Au moins 8 caractères</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#15B5B0] focus:border-[#15B5B0] transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-[#15B5B0] hover:bg-[#0d9488] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Étape 3: Choix de l'abonnement */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Choisissez votre abonnement</h3>
                  <p className="text-sm text-gray-600">Sélectionnez le plan qui vous convient</p>
                </div>

                <div className="space-y-4">
                  {membershipPlans.map((plan) => (
                    <label
                      key={plan.id}
                      className={`relative block cursor-pointer rounded-xl border-2 p-4 transition-all hover:scale-105 ${formData.membershipType === plan.id
                        ? 'border-[#15B5B0] bg-[#15B5B0]/5'
                        : plan.color
                        }`}
                    >
                      <input
                        type="radio"
                        name="membershipType"
                        value={plan.id}
                        checked={formData.membershipType === plan.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />

                      {plan.popular && (
                        <div className="absolute -top-2 left-4">
                          <span className="bg-[#e6bb00] text-black text-xs font-bold px-2 py-1 rounded-full">
                            Populaire
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">{plan.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{plan.price}</p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-[#15B5B0]" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`w-5 h-5 rounded-full border-2 transition-colors ${formData.membershipType === plan.id
                          ? 'border-[#15B5B0] bg-[#15B5B0]'
                          : 'border-gray-300'
                          }`}>
                          {formData.membershipType === plan.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Conditions */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-1 text-[#15B5B0] border-gray-300 rounded focus:ring-[#15B5B0]"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      J'accepte les{" "}
                      <Link href="/terms" className="text-[#15B5B0] hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link href="/privacy" className="text-[#15B5B0] hover:underline">
                        politique de confidentialité
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeNewsletter"
                      checked={formData.agreeNewsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-1 text-[#15B5B0] border-gray-300 rounded focus:ring-[#15B5B0]"
                    />
                    <span className="text-sm text-gray-600">
                      Je souhaite recevoir les actualités et offres de Gogym
                    </span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.agreeTerms || isLoading}
                    className="flex-1 bg-[#15B5B0] hover:bg-[#0d9488] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Créer mon compte
                        <CheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Connexion sociale (uniquement étape 1) */}
          {currentStep === 1 && (
            <>
              <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou s'inscrire avec</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </>
          )}
        </div>

        {/* Lien connexion */}
        <p className="text-center mt-6 text-gray-600">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#15B5B0] hover:text-[#0d9488] font-medium transition-colors">
            Se connecter
          </Link>
        </p>

        {/* Message de succès */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compte créé avec succès !</h3>
            <p className="text-gray-600 mb-6">
              Bienvenue chez Gogym ! Un email de confirmation a été envoyé à votre adresse.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-[#15B5B0] hover:bg-[#0d9488] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Se connecter maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
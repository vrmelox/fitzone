"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function HomeMenu() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="font-josefin">
            <div className="p-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-1.5">
                    <img src="/gofit.svg" alt="Logo Gogym" className="w-10 h-10" />
                    <Link
                        href="/"
                        className="hidden md:block md:text-3xl font-bold bg-gradient-to-r from-white to-[#FAD02C] bg-clip-text text-transparent hover:from-[#FAD02C] hover:to-white transition-all duration-500"
                    >
                        Gogym
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/about", label: "À Propos" },
                        { href: "/contact", label: "Contact" },
                        { href: "/faq", label: "FAQ" },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`text-sm md:text-xl font-semibold transition-colors hover:text-[#FAD02C] ${pathname === href ? "text-[#15B5B0]" : "text-white"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Login Icon */}
                <Link href="/login" className="group hidden md:flex items-center justify-center hover:scale-110 transition-transform">
                    <img
                        src="/userlogin.png"
                        alt="Connexion"
                        className="w-10 h-10 bg-blue-100 rounded-full p-1.5 transition-all group-hover:bg-[#FAD02C] group-hover:shadow-lg"
                    />
                </Link>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile nav menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-6 pb-4 space-y-4 flex flex-col bg-black/80 text-white">
                    {[
                        { href: "/", label: "Accueil" },
                        { href: "/about", label: "À Propos" },
                        { href: "/contact", label: "Contact" },
                        { href: "/faq", label: "FAQ" },
                        { href: "/login", label: "Connexion" },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-base font-medium transition-colors hover:text-[#FAD02C] ${pathname === href ? "text-[#15B5B0]" : "text-white"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    )
}

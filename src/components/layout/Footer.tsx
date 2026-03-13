import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className="mt-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#e6bb00] mb-4">Gogym</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Votre partenaire fitness pour atteindre vos objectifs de santé et de bien-être.
              Rejoignez notre communauté de passionnés.
            </p>
            <div className="flex space-x-4 cursor-pointer">
              <Link href="https://www.facebook.com/gogymctn/" className="w-10 h-10 bg-[#1A77F2] rounded-full flex items-center justify-center hover:bg-[#0d9488] transition-colors">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link href="https://www.instagram.com/gogymbenin/" className="w-10 h-10 bg-[#E1306C] rounded-full flex items-center justify-center hover:bg-[#0d9488] transition-colors">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link href="https://www.tiktok.com/@gogymbeninofficiel" className="w-10 h-10 bg-[#000000] rounded-full flex items-center justify-center hover:bg-[#0d9488] transition-colors">
                <FontAwesomeIcon icon={faTiktok} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#e6bb00] transition-colors">Musculation</a></li>
              <li><a href="#" className="hover:text-[#e6bb00] transition-colors">Cardio Training</a></li>
              <li><a href="#" className="hover:text-[#e6bb00] transition-colors">Cours Collectifs</a></li>
              <li><a href="#" className="hover:text-[#e6bb00] transition-colors">Coaching Personnel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Rue 1200 Sodjeatimè-centre</li>
              <li>4530 Cotonou, Bénin</li>
              <li>+229  51 51 51 02</li>
              <li>contact@gogym.bj</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Gogym. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#e6bb00] text-sm transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-gray-400 hover:text-[#e6bb00] text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-[#e6bb00] text-sm transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
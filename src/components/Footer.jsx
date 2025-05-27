import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Soutenancia</h3>
                <p className="text-sm text-blue-400">
                  ESI SBA Official Platform
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              The official Final Year Project management platform for École
              Supérieure d'Informatique, Sidi Bel Abbès. Streamlining academic
              excellence through digital innovation.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">
                  ESI SBA, Sidi Bel Abbès, Algeria
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">pfe@esi-sba.dz</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+213 48 74 50 00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-blue-400 transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">
              User Access
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/auth//login"
                  className="hover:text-blue-400 transition-colors"
                >
                  Student Login
                </a>
              </li>
              <li>
                <a
                  href="/auth/login"
                  className="hover:text-blue-400 transition-colors"
                >
                  Teacher Portal
                </a>
              </li>
              <li>
                <a
                  href="/auth/login"
                  className="hover:text-blue-400 transition-colors"
                >
                  Admin Panel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 ESI SBA PFE Management System. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 text-sm">Powered by</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-teal-600 rounded"></div>
                <span className="text-blue-400 font-semibold">devcrew</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

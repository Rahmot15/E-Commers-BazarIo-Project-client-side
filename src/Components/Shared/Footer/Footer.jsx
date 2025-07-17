import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Logo from "../Logo/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="">
              <Logo/>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building innovative solutions for tomorrow's digital world. We
              create exceptional experiences that drive business growth.
            </p>
            <div className="flex space-x-4 pt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-blue-500/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About Us", "Services", "Portfolio", "Blog", "Careers"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-blue-500/30 pb-2">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="text-blue-400 flex-shrink-0 w-4 h-4" />
                <span className="text-sm">
                  123 Tech Street, Digital City, DC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="text-blue-400 flex-shrink-0 w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="text-blue-400 flex-shrink-0 w-4 h-4" />
                <span className="text-sm">info@techcorp.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-blue-500/30 pb-2">
              Stay Updated
            </h4>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Legal */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-1">
              <span className="text-gray-400 text-sm mr-3">Follow us:</span>
              {[
                { icon: Facebook, color: "hover:text-blue-500", link: "https://www.facebook.com/ar.rhmatulla" },
                { icon: Instagram, color: "hover:text-pink-500", link: "https://www.instagram.com/arrhmatulla/" },
                { icon: Linkedin, color: "hover:text-blue-600", link: "https://www.linkedin.com/in/md-rahmatullah-87a52b334/" },
                { icon: Youtube, color: "hover:text-red-500", link: "https://www.youtube.com/@RahmotCoder" },
              ].map((social, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={social.link}
                  className={`w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-slate-600 hover:scale-110`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} TechCorp. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with{" "}
              <Heart className="text-red-500 mx-1 animate-pulse w-4 h-4" /> by
              Bazario Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

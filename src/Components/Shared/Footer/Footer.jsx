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
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white ">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="opacity-80 text-sm leading-relaxed">
              Building innovative solutions for tomorrow's digital world. We
              create exceptional experiences that drive business growth.
            </p>
            <div className="flex space-x-4 pt-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-primary/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About Us", "Services", "Portfolio", "Blog", "Careers"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="opacity-80 hover:text-primary transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-primary/30 pb-2">
              Contact Info
            </h4>
            <div className="space-y-3 opacity-80">
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary w-4 h-4" />
                <span className="text-sm">
                  123 Tech Street, Digital City, DC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-primary w-4 h-4" />
                <span className="text-sm">info@techcorp.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold border-b border-primary/30 pb-2">
              Stay Updated
            </h4>
            <p className="opacity-80 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-base-100 border border-base-300 rounded-l-lg text-sm focus:outline-none focus:border-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-content rounded-r-lg hover:bg-primary-focus transition-all text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social & Legal */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1">
            <span className="opacity-70 text-sm mr-3">Follow us:</span>
            {[
              { icon: Facebook, link: "https://www.facebook.com/ar.rhmatulla" },
              {
                icon: Instagram,
                link: "https://www.instagram.com/arrhmatulla/",
              },
              {
                icon: Linkedin,
                link: "https://www.linkedin.com/in/md-rahmatullah-87a52b334/",
              },
              { icon: Youtube, link: "https://www.youtube.com/@RahmotCoder" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                className="w-10 h-10 bg-base-200 rounded-full flex items-center justify-center hover:bg-base-300 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6 text-sm opacity-80">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-base-300 border-t border-base-200">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="opacity-70 text-sm">
            © {new Date().getFullYear()} TechCorp. All rights reserved.
          </p>
          <p className="opacity-70 text-sm flex items-center">
            Made with{" "}
            <Heart className="text-error mx-1 animate-pulse w-4 h-4" /> by
            Bazario Team
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

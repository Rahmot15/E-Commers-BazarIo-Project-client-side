import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Logo */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Logo />
          <p className="text-sm opacity-80">
            123 Tech Street, Digital City, DC 12345
          </p>
          <p className="text-sm opacity-80">
            +1 (555) 123-4567 | info@techcorp.com
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {[
            { icon: Facebook, link: "https://www.facebook.com/ar.rhmatulla" },
            { icon: Instagram, link: "https://www.instagram.com/arrhmatulla/" },
            { icon: Linkedin, link: "https://www.linkedin.com/in/md-rahmatullah-87a52b334/" },
            { icon: Youtube, link: "https://www.youtube.com/@RahmotCoder" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-700 text-center py-4 text-sm opacity-70">
        © {new Date().getFullYear()} TechCorp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import logoImg from "../../../../public/logoImg.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
      <img src={logoImg} className="w-9" />

      <span className="text-2xl font-bold text-gray-200 hidden sm:block">
        Bazario
      </span>
    </Link>
  );
};

export default Logo;

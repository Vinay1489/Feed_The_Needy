import React from "react";
import { Link } from "react-scroll";

const navItems = [
  { label: "How It Works", target: "howItWorks" },
  { label: "Expiry Estimator", target: "expiryEstimator" },
  { label: "Testimonials", target: "testimonials" },
  { label: "Impact", target: "impact" },
];

const HeaderNavigation = () => {
  return (
    <nav className="flex gap-10 max-sm:hidden">
      {navItems.map((item, index) => (
        <NavItem key={index} text={item.label} target={item.target} />
      ))}
    </nav>
  );
};

const NavItem = ({ text, target }) => {
  return (
    <Link
      to={target}
      smooth={true}
      duration={1000}
      offset={-70} // adjust for sticky headers if needed
      className="cursor-pointer text-[1.03rem] font-semibold px-3 py-1 text-slate-900 transition-all duration-300 transform rounded-md hover:text-blue-600 hover:scale-105 hover:shadow-md hover:shadow-blue-100"
    >
      {text}
    </Link>
  );
};

export default HeaderNavigation;

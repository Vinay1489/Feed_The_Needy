import React from "react";

function FooterLinkGroup({ title, links, className = "" }) {
  return (
    <div
      className={`flex flex-col items-start text-sm leading-none text-slate-500 ${className}`}
    >
      <h3 className="self-stretch text-lg font-bold leading-loose text-slate-950">
        {title}
      </h3>
      <nav className="flex flex-col items-start w-full">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`mt-${index === 0 ? "7" : index === links.length - 1 ? "5" : "5"} hover:text-slate-700`}
          >
            {link.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default FooterLinkGroup;

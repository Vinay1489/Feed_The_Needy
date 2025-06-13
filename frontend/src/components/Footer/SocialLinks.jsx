import React from "react";

function SocialLinks({ icons, className = "" }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {icons.map((icon, index) => (
        <a key={index} href="#" aria-label={`Social media link ${index + 1}`}>
          <img
            src={icon.src}
            alt={icon.alt}
            className="object-contain shrink-0 w-5 aspect-square"
          />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;

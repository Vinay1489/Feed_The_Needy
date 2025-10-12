import React from "react";

export default function EmbedMap({ lat, lng, label }) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  return (
    <div className="rounded-xl overflow-hidden border border-emerald-100">
      <div className="px-3 py-2 text-xs font-medium bg-emerald-50 text-emerald-800 border-b border-emerald-100">
        {label}
      </div>
      <iframe
        title={label}
        src={src}
        className="w-full h-40"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

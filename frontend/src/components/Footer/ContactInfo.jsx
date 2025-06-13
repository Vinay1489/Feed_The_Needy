import React from "react";

function ContactInfo({ items }) {
  return (
    <address className="not-italic">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 mt-4 leading-none text-slate-500 first:mt-7"
        >
          <img
            src={item.icon}
            alt=""
            className="object-contain shrink-0 w-4 aspect-square"
            aria-hidden="true"
          />
          {item.type === "email" ? (
            <a
              href={`mailto:${item.text}`}
              className="basis-auto hover:text-slate-700"
            >
              {item.text}
            </a>
          ) : item.type === "phone" ? (
            <a
              href={`tel:${item.text.replace(/\D/g, "")}`}
              className="my-auto basis-auto hover:text-slate-700"
            >
              {item.text}
            </a>
          ) : (
            <p className="flex-auto">{item.text}</p>
          )}
        </div>
      ))}
    </address>
  );
}

export default ContactInfo;

import React from "react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="flex flex-col items-center w-full max-w-[1368px] mb-12">
        <h1 className="text-5xl font-bold leading-none text-center text-slate-950 max-md:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-loose text-center text-slate-500 max-w-2xl">
          {subtitle}
        </p>
      </div>

      <div className="w-full flex justify-center">{children}</div>

      <footer className="mt-16 text-center text-slate-500">
        <p>
          © {new Date().getFullYear()} Food Rescue Network. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-slate-600 hover:text-blue-600">
            Terms
          </a>
          <a href="#" className="text-slate-600 hover:text-blue-600">
            Privacy
          </a>
          <a href="#" className="text-slate-600 hover:text-blue-600">
            Contact
          </a>
        </div>
      </footer>
    </section>
  );
}

export default AuthLayout;

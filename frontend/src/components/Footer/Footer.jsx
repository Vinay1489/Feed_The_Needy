"use client";
import React from "react";
import FooterColumn from "./FooterColumn";
import FooterLinkGroup from "./FooterLinkGroup";
import NewsletterSignup from "./NewsletterSignup";
import SocialLinks from "./SocialLinks";
import ContactInfo from "./ContactInfo";

function Footer() {
  const quickLinks = [
    { text: "About Us", href: "#" },
    { text: "How It Works", href: "#" },
    { text: "Impact", href: "#" },
    { text: "Food Safety", href: "#" },
    { text: "Press Kit", href: "#" },
    { text: "Careers", href: "#" },
  ];

  const getInvolvedLinks = [
    { text: "Donate Food", href: "#" },
    { text: "Volunteer", href: "#" },
    { text: "Partner as NGO", href: "#" },
    { text: "Corporate Partners", href: "#" },
    { text: "Developer API", href: "#" },
    { text: "Open Source", href: "#" },
  ];

  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/c285d3fda73f8c9897c9374f937da265e9ddc990?placeholderIfAbsent=true",
      alt: "Social Media Icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/a02735558d0495a2e6917566749b1cb8e536f6d8?placeholderIfAbsent=true",
      alt: "Social Media Icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/f91493d2f6ec230f8af6399b8ac2f88e7d67f404?placeholderIfAbsent=true",
      alt: "Social Media Icon",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/a89cec86ab0b0a2f63a410fbcdc85a15b0d8ec26?placeholderIfAbsent=true",
      alt: "Social Media Icon",
    },
  ];

  const contactInfo = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/fa9a1de0aff244cdc2237a83b875504d8917d4e1?placeholderIfAbsent=true",
      text: "hello@foodflowforward.org",
      type: "email",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/7cbe37a8277d36fd952b0b5de96229b3224d83b9?placeholderIfAbsent=true",
      text: "+1 (555) 123-4567",
      type: "phone",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/36ffb10a676120540be45ac7d5b69a6176976c0f?placeholderIfAbsent=true",
      text: "123 Impact Way, San Francisco, CA 94107",
      type: "address",
    },
  ];

  const policyLinks = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
    { text: "Cookie Policy", href: "#" },
    { text: "Accessibility", href: "#" },
  ];

  return (
    <footer className="flex flex-col items-center px-20 pt-16 pb-8 bg-slate-100 bg-opacity-30 max-md:px-5">
      <div className="w-full max-w-[1373px] max-md:max-w-full">
        <section className="w-full max-md:mr-1.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[41%] max-md:ml-0 max-md:w-full">
              <div className="max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-[76%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start w-full max-md:mt-2.5">
                      <div className="flex gap-2 text-xl font-bold leading-snug text-slate-950">
                        <div className="flex shrink-0 w-8 h-8 rounded-lg" />
                        <h2 className="my-auto basis-auto">FoodFlow Forward</h2>
                      </div>
                      <p className="self-stretch mt-5 text-sm leading-5 text-slate-500">
                        Connecting excess food with those in need through
                        <br />
                        an innovative, AI-powered platform.
                      </p>
                      <SocialLinks icons={socialIcons} className="mt-5" />
                    </div>
                  </div>
                  <div className="ml-5 w-[24%] max-md:ml-0 max-md:w-full">
                    <FooterLinkGroup
                      title="Quick Links"
                      links={quickLinks}
                      className="mt-1.5 max-md:mt-4"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-5 w-[59%] max-md:ml-0 max-md:w-full">
              <div className="grow mt-2 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-[28%] max-md:ml-0 max-md:w-full">
                    <FooterLinkGroup
                      title="Get Involved"
                      links={getInvolvedLinks}
                      className="max-md:mt-10"
                    />
                  </div>
                  <div className="ml-5 w-[72%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start w-full text-sm max-md:mt-10">
                      <h3 className="text-lg font-bold leading-loose text-slate-950">
                        Contact Us
                      </h3>
                      <ContactInfo items={contactInfo} />
                      <NewsletterSignup />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap gap-5 justify-between items-start pt-9 pb-px mt-12 w-full text-xs leading-none border-t border-slate-200 text-slate-500 max-md:mt-10 max-md:max-w-full">
          <p>© 2025 Feed the needy. All rights reserved.</p>
          <nav className="flex gap-3">
            {policyLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-slate-700">
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

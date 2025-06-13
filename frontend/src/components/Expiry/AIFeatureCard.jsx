import React from "react";

const AIFeatureCard = () => {
  return (
    <section className="flex overflow-hidden relative flex-col grow items-end px-20 pt-4 pb-96 text-sm font-medium leading-none text-white whitespace-nowrap rounded-xl min-h-[495px] max-md:pb-24 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/b941ee735fcf3ce7d4a05ae2cd84db1425d43821?placeholderIfAbsent=true"
        className="object-cover absolute inset-0 size-full"
        alt="AI Feature visualization"
      />
      <span className="relative px-3 py-3.5 rounded-full bg-white bg-opacity-20">
        AI-Powered
      </span>
    </section>
  );
};

export default AIFeatureCard;

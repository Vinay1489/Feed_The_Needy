const BenefitsCard = () => {
  const benefits = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/25f1494c04e95f7c64ac6f8fac5837bf063d4c94?placeholderIfAbsent=true",
      title: "Flexible Schedules",
      description: "Choose when you want to volunteer",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/e11e4584b389ea20dffe356f86f9e0d4fad94ffa?placeholderIfAbsent=true",
      title: "Track Your Impact",
      description: "See how many meals you've helped deliver",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/2bab73d18397aa2a0017d10fc505ea3d6a1a5bbe?placeholderIfAbsent=true",
      title: "Earn Rewards",
      description: "Get badges and recognition for your service",
    },
  ];

  return (
    <article className="flex flex-col p-6 w-full rounded-xl border shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 ">
      {/* Header Section */}
      <div className="flex justify-between items-start flex-wrap gap-5">
        <div>
          <h3 className="text-xl font-bold text-slate-950">
            Volunteer Benefits
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Join our community and earn rewards
          </p>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/2cab94ea3ca3b07042bef85a46af335f88493ea8?placeholderIfAbsent=true"
          alt="Benefits icon"
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Benefits List */}
      <div className="mt-10 space-y-10">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-4">
            <img
              src={benefit.icon}
              alt={benefit.title}
              className="w-10 h-10 rounded-full object-contain"
            />
            <div>
              <h4 className="text-base font-semibold text-slate-950">
                {benefit.title}
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default BenefitsCard;

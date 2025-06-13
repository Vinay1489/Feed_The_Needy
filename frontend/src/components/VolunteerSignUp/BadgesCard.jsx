const BadgesCard = () => {
  const badges = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/bbc0f8362c0140cf2f4872ca69451790c9afc457?placeholderIfAbsent=true",
      name: "First Delivery",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/bd671e41ff3800cc86c2388f09cc530210b5b6db?placeholderIfAbsent=true",
      name: "10 Deliveries",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/8c3e91fe94c2cbe2904eba66be951adce8412db0?placeholderIfAbsent=true",
      name: "Weekend Hero",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/184ebf7c1987c2b134810a989ea6864a25aafef5?placeholderIfAbsent=true",
      name: "100kg Delivered",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/bbc0f8362c0140cf2f4872ca69451790c9afc457?placeholderIfAbsent=true",
      name: "Eco Warrior",
    },
  ];

  return (
    <article className="flex overflow-hidden flex-col items-start py-7 pr-20 pl-6 mt-8 w-full font-bold rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 text-slate-950 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col self-stretch">
          <h3 className="self-start text-xl leading-snug">Available Badges</h3>
          <div className="flex gap-3 mt-5 text-xs leading-none">
            {badges.slice(0, 2).map((badge, index) => (
              <div
                key={index}
                className="flex flex-1 gap-1 px-3.5 py-2 rounded-full border border-solid bg-blue-600 bg-opacity-10 border-slate-200"
              >
                <img
                  src={badge.icon}
                  alt={badge.name}
                  className="object-contain shrink-0 w-3.5 aspect-square"
                />
                <span className="my-auto">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
        {badges.slice(2, 4).map((badge, index) => (
          <div
            key={index}
            className="flex gap-1 px-3.5 py-2 mt-10 text-xs leading-none rounded-full border border-solid bg-blue-600 bg-opacity-10 border-slate-200"
          >
            <img
              src={badge.icon}
              alt={badge.name}
              className="object-contain shrink-0 w-3.5 aspect-square"
            />
            <span className="my-auto">{badge.name}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-1 px-3.5 py-2 mt-3 text-xs leading-none rounded-full border border-solid bg-blue-600 bg-opacity-10 border-slate-200">
        <img
          src={badges[4].icon}
          alt={badges[4].name}
          className="object-contain shrink-0 w-3.5 aspect-square"
        />
        <span className="my-auto">{badges[4].name}</span>
      </div>

      <button className="self-center p-4 mt-6 max-w-full text-sm font-medium leading-none text-center bg-white rounded-md border border-solid border-slate-200 w-[136px] hover:bg-slate-50 transition-colors">
        See All Rewards
      </button>
    </article>
  );
};

export default BadgesCard;


import MiniEstimatorForm from "./MiniEstimatorForm";
import {Link} from "react-router-dom";

const HomeEstimatorSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 lg:px-24 bg-blue-50" id="expiryEstimator">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
          🧠 AI Smart Expiry Estimator
        </h2>
        <p className="mt-4 text-slate-700 text-lg">
          Instantly estimate how long donated food will stay fresh. Save food.
          Save lives.
        </p>
      </div>

      {/* Mini Form */}
      {/* <MiniEstimatorForm /> */}

      {/* Impact Card */}
      <div className="mt-12 flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm w-full">
          <h3 className="text-2xl font-semibold text-green-700">
            🍱 246+ Meals Saved
          </h3>
          <p className="text-gray-600 mt-2 text-sm">
            Estimated freshness helped prioritize and deliver food on time.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "🧠",
            title: "AI-Powered Accuracy",
            desc: "Understands food type and predicts spoilage timelines.",
          },
          {
            icon: "⏱️",
            title: "Fast & Reliable",
            desc: "Estimate expiry in seconds, just by entering basic info.",
          },
          {
            icon: "🌍",
            title: "Reduces Waste",
            desc: "NGOs can deliver food before it goes bad — zero spoilage.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h4 className="font-bold text-lg">{f.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-14 text-center">
        <Link href="/estimator">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition duration-300">
            Try Full Estimator →
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomeEstimatorSection;

import Header from "../Header/Header";
import FoodDonationHero from "../HeroSection/FoodDonationHero";
import CollectiveImpact from "../Collections/CollectiveImpact";
import VoicesOfImpact from "../VoicesOfImpact/VoicesOfImpact";
import Footer from "../Footer/Footer";
import HowItWorks from "../FlowDiagram/HowItWorks";
import HomeEstimatorSection from "./HomeEstimatorSection";
function Home() {
  return (
    <div>
      <Header />
      <FoodDonationHero />
      <HowItWorks />
      <CollectiveImpact />
      {/* <SmartExpiryEstimator/> */}
      <HomeEstimatorSection/>
      <VoicesOfImpact />
      <Footer />
    </div>
  );
}

export default Home;

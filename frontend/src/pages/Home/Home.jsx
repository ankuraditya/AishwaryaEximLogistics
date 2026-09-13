import HomeHero from "../../components/home/HomeHero";
import HomeAbout from "../../components/home/HomeAbout";
import ProductCategories from "../../components/home/ProductCategories";
import HandicraftShowcase from "../../components/home/HandicraftShowcase";
import SustainabilitySection from "../../components/home/SustainabilitySection";
import WhyChooseSection from "../../components/home/WhyChooseSection";
import ExportProcessSection from "../../components/home/ExportProcessSection";
import GlobalTradeSection from "../../components/home/GlobalTradeSection";
import QualitySection from "../../components/home/QualitySection";
import HomeGallery from "../../components/home/HomeGallery";
import HomeInsights from "../../components/home/HomeInsights";
import CertificationsSection from "../../components/home/CertificationsSection";

import "../../components/home/home.css";

const Home = () => {
  return (
    <>
      <HomeHero />

      <HomeAbout />

      <ProductCategories />

      <HandicraftShowcase />

      <SustainabilitySection />

      <WhyChooseSection />

      <ExportProcessSection />

      <GlobalTradeSection />

      <QualitySection />

      <HomeGallery />

      <HomeInsights />

      <CertificationsSection />
    </>
  );
};

export default Home;

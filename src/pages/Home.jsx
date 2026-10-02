import Hero from "../components/home/Hero";
import BrandStrip from "../components/home/BrandStrip";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductList from "../components/home/ProductList";
import DressStyle from "../components/home/DressStyle";
import CustomerReviews from "../components/home/CustomerReviews";
import Newsletter from "../components/home/Newsletter";



const Home = () => {
  return (
    <>
      <AnnouncementBar/>
      <Navbar/>
      <Hero />
      <BrandStrip />
      <ProductList subtitle="BEST SELLING" start={0} />
      <ProductList subtitle="NEW ARRIVALS" start={4} />
      <DressStyle />
      <CustomerReviews/>
      <Newsletter/>
      <Footer/>
    </>
  );
};

export default Home;
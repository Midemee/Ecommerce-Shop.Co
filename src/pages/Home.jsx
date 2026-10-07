import Hero from "../components/home/Hero";
import BrandStrip from "../components/home/BrandStrip";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductList from "../components/home/ProductList";
import DressStyle from "../components/home/DressStyle";
import CustomerReviews from "../components/home/CustomerReviews";

const Home = () => {
  return (
    <>
      <Header />  
      <Hero />
      <BrandStrip />
      <ProductList subtitle="NEW ARRIVALS" start={0} />
      <ProductList subtitle="TOP SELLING" start={4} />
      <DressStyle />
      <CustomerReviews/>
      <Footer/>
    </>
  );
};

export default Home;
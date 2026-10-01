import Hero from "../components/home/Hero";
import BrandStrip from "../components/home/BrandStrip";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
// import DressStyle from "../components/home/DressStyle";


const Home = () => {
  return (
    <>
      <AnnouncementBar/>
      <Navbar/>
      <Hero />
      <BrandStrip />
      {/* <DressStyle /> */}
      <Footer/>
    </>
  );
};

export default Home;
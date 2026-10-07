import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <Navbar />
    </header>
  );
};

export default Header;
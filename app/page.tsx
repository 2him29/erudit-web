import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Ticker from "./_components/Ticker";
import About from "./_components/About";
import Menu from "./_components/Menu";
import Gallery from "./_components/Gallery";
import Reviews from "./_components/Reviews";
import Reservation from "./_components/Reservation";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Menu />
        <Gallery />
        <Reviews />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}

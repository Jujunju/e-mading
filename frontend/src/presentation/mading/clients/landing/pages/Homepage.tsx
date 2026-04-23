import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { HeroSection } from '../components/HeroSection';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <Card />
      <Footer />
    </div>
  );
};

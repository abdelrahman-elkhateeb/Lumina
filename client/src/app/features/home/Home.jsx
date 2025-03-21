import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';
import Recommended from './Recommended';

function Home() {
  return (
    <section className="container m-auto px-4">
      <HeroSection />
      {/* <Recommended /> */}
      <FeaturesSection />
    </section>
  )
}

export default Home

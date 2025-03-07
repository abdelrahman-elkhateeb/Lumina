import StarBackground from '../ui/StarBackground';
import HeroSection from './HeroSection';
import Recommended from './Recommended';

function Home() {
  return (
    <section className="container m-auto px-4">
      <StarBackground />
      <HeroSection />
      <Recommended />
    </section>
  )
}

export default Home

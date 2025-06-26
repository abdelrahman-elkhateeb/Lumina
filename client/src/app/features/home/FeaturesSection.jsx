import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBackground from "../ui/starBackground";
import logo from "../../../../public/assets/logo.svg";

import img1 from "/public/assets/spaceMan(1).svg";
import img2 from "/public/assets/spaceMan(2).svg";
import img3 from "/public/assets/spaceMan(3).svg";
import img4 from "/public/assets/spaceMan(4).svg";
import img5 from "/public/assets/spaceMan(5).svg";
import img6 from "/public/assets/spaceMan(6).svg";
import img7 from "/public/assets/spaceMan(7).svg";
import img8 from "/public/assets/spaceMan(8).svg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

gsap.registerPlugin(ScrollTrigger);

function FeaturesSection() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const [activeFeature, setActiveFeature] = useState(0);

  const spacemanPositions = [
    { x: 15, y: 10, scale: 0.8, rot: -8 },
    { x: 85, y: 15, scale: 1.1, rot: 12 },
    { x: 25, y: 40, scale: 0.9, rot: -5 },
    { x: 75, y: 45, scale: 1.0, rot: 8 },
    { x: 50, y: 65, scale: 1.2, rot: -15 },
    { x: 10, y: 75, scale: 0.7, rot: 10 },
    { x: 90, y: 80, scale: 0.8, rot: -10 },
    { x: 50, y: 25, scale: 1.0, rot: 5 }
  ];

  // Generalized Feature Set for Lumina
  const features = [
    {
      title: "Personalized Learning Paths",
      description: "Adaptive AI tailors courses to your skill level and interests."
    },
    {
      title: "Live Coding Environment",
      description: "Code, debug, and collaborate in real-time within our platform."
    },
    {
      title: "Interactive Quizzes & Challenges",
      description: "Engage with interactive assessments that reinforce learning."
    },
    {
      title: "Project-Based Curriculum",
      description: "Gain real-world experience by working on hands-on projects."
    },
    {
      title: "AI-Powered Mentor",
      description: "Get instant feedback and guidance from our intelligent AI tutor."
    },
  ];

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${features.length * 100}%`,
      pin: true,
      scrub: 1,
      snap: 1 / (features.length - 1),
      onUpdate: (self) => {
        setActiveFeature(Math.round(self.progress * (features.length - 1)));
      },
    });

    // Entrance Animations for Spacemen
    gsap.fromTo(imagesRef.current,
      { opacity: 0, y: 100, scale: 0.5 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reset" }
      }
    );

    // Floating Spaceman Animation
    imagesRef.current.forEach((img, index) => {
      gsap.to(img, {
        y: "+=15",
        rotation: spacemanPositions[index].rot,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      imagesRef.current.forEach(img => gsap.killTweensOf(img));
    };
  }, [features.length]);

  return (
    <div ref={sectionRef} className="h-screen flex justify-center items-center bg-galaxy-black relative overflow-hidden">
      <StarBackground />

      {/* Main Content */}
      <div className="text-center z-10 relative">
        <img src={logo} alt="Lumina Logo" className="mx-auto  mb-4" />
        <h2 className="text-4xl font-bold text-stellar-white mb-4">
          {features[activeFeature].title}
        </h2>
        <p className="text-lg text-nebula-gray">
          {features[activeFeature].description}
        </p>
      </div>

      {/* Spacemen Floating Around */}
      {images.map((img, index) => (
        <img
          key={index}
          ref={el => imagesRef.current[index] = el}
          src={img}
          alt={`Spaceman ${index + 1}`}
          className="absolute w-32 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${spacemanPositions[index].x}%`,
            top: `${spacemanPositions[index].y}%`,
            filter: "drop-shadow(0 0 12px rgba(110, 231, 183, 0.3))"
          }}
        />
      ))}
    </div>
  );
}

export default FeaturesSection;

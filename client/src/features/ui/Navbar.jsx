import { useState } from "react";
import { Link } from "react-router-dom";
import maleSvg from "../../../public/assets/male.svg"; 
import femaleSvg from "../../../public/assets/female.svg";

function navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav>
      
    </nav>
  );
}

export default navbar

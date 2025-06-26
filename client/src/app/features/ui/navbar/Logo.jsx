import { Link } from "react-router-dom";
import logo from "/public/assets/logo.svg";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="" className="w-20" />
    </Link>
  )
}

export default Logo;

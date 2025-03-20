import { Link } from "react-router-dom";
import logo from "../../../../../public/assets/logo-no-background.svg";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="" className="w-60" />
    </Link>
  )
}

export default Logo;

import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/public/assets/logo.svg" alt="" className="w-20" />
    </Link>
  )
}

export default Logo;

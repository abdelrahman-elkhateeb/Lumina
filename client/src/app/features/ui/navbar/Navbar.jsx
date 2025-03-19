import { useFetchUserDataQuery } from "../../redux/auth/registrationApi";
import ErrorPage from "../ErrorPage";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import Profile from "./Profile";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const { data: userData, isLoading, error } = useFetchUserDataQuery();
  const user = userData?.data?.user;

  if (isLoading) return null;

  if (error) return <ErrorPage />;

  return (
    <header className="sticky top-0 z-[1000] p-2 md:p-4 font-heading">
      <nav className="flex items-center justify-between px-6 py-4 bg-secondary-500/60 rounded-lg outline outline-2 outline-accent-700">
        {/* Logo */}
        <Logo />

        {/* desktop navigation */}
        <DesktopNav />

        {/* Profile */}
        <Profile user={user} />

        <MobileMenu />
      </nav>
    </header>
  );
}

export default Navbar;

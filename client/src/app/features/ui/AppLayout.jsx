import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import StarBackground from "./starBackground";

function AppLayout() {
  const location = useLocation(); // Get the current route

  // Define routes where the Navbar should NOT be rendered
  const hideNavbarRoutes = ["/login", "/signup"];

  // Check if the current route is in the hideNavbarRoutes array
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-background-500 min-h-dvh">
      {shouldShowNavbar && <Navbar />}
      <Outlet />
    </div>
  )
}

export default AppLayout;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function ProtectedRoutes() {
  const { token, loading } = useAuth();

  // If still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or skeleton screen
  }

  // If not loading and no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  // If token exists, render the child routes using Outlet
  return <Outlet />;
}

export default ProtectedRoutes;
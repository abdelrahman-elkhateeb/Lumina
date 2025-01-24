import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../features/ui/Spinner";

function ProtectedRoutes() {
  // const { token, loading } = useAuth();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Check for token in localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  // If still loading, show a loading indicator
  if (loading) {
    return <Spinner /> // Replace with a spinner or skeleton screen
  }

  // If not loading and no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  // If token exists, render the child routes using Outlet
  return <Outlet />;
}

export default ProtectedRoutes;
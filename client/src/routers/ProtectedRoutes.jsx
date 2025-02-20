import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../app/features/ui/Spinner";
import { useFetchUserDataQuery } from "../app/features/auth/registrationApi";

function ProtectedRoutes() {
  const { data: user, isLoading, error } = useFetchUserDataQuery();
  console.log(user);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

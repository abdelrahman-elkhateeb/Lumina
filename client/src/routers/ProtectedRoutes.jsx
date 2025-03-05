import { Navigate, Outlet } from "react-router-dom";
import { useFetchUserDataQuery } from "../app/features/auth/registrationApi";
import LightBulbLoader from "../app/features/ui/LightBulbLoader";

function ProtectedRoutes() {
  const { data: user, isLoading, error } = useFetchUserDataQuery();

  if (isLoading) {
    return <LightBulbLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

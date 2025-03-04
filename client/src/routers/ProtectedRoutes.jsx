import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../app/features/ui/Spinner";
import { useFetchUserDataQuery } from "../app/features/auth/registrationApi";
import LightBulbLoader from "../app/features/ui/LightBulbLoader";

function ProtectedRoutes() {
  const { data: user, isLoading, error } = useFetchUserDataQuery();
  console.log(user);

  if (isLoading) {
    return <LightBulbLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

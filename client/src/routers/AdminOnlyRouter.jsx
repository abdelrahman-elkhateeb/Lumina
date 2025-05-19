import { Navigate, Outlet } from "react-router-dom";
import { useFetchUserDataQuery } from "../app/features/redux/auth/registrationApi";
import LightBulbLoader from "../app/features/ui/LightBulbLoader";
import ErrorPage from "../app/features/ui/ErrorPage";

function AdminOnlyRoute() {
  const { data, isLoading, error } = useFetchUserDataQuery();

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  const userType = data?.data?.user?.userType;

  if (userType === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}

export default AdminOnlyRoute;

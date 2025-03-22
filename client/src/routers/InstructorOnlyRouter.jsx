import { Navigate, Outlet } from "react-router-dom";
import LightBulbLoader from "../app/features/ui/LightBulbLoader";
import { useFetchUserDataQuery } from "../app/features/redux/auth/registrationApi";
import ErrorPage from "../app/features/ui/ErrorPage";

function InstructorOnlyRouter() {
  const { data, isLoading, error } = useFetchUserDataQuery();

  console.log("User Data:", data?.data.user.userType);

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  // Adjust based on the actual API response
  const userType = data?.data.user.userType;

  if (userType == "instructor") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}

export default InstructorOnlyRouter;
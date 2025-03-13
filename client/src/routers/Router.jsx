import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../app/features/ui/AppLayout";
import ErrorPage from "../app/features/ui/ErrorPage";
import { lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import UserProfile from "../app/features/user/UserProfile";
import CoursePreview from "../app/features/course/coursePreview/CoursePreview";

// Lazy-loaded components
const Signup = lazy(() => import("../app/features/auth/signup/Signup"));
const Login = lazy(() => import("../app/features/auth/login/Login"));
const Home = lazy(() => import("../app/features/home/Home"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />, // Custom error page
    children: [
      { path: "*", element: <ErrorPage /> }, // Catch-all route
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <UserProfile /> },
          { path: "/courses/:id", element: <CoursePreview /> }
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
])


export default router;
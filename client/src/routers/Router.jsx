import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../features/ui/AppLayout";
import ErrorPage from "../features/ui/ErrorPage";
import { lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";

// Lazy-loaded components
const Signup = lazy(() => import("../features/registration/signup/Signup"));
const Login = lazy(() => import("../features/registration/login/Login"));
const Home = lazy(() => import("../features/home/Home"));

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
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
])


export default router;
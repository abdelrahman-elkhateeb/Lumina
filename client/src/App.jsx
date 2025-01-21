import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./features/ui/AppLayout";
import ErrorPage from "./features/ui/ErrorPage"; // Custom error page
import Spinner from "./features/ui/Spinner"; // Loading spinner

// Lazy-loaded components
const Signup = lazy(() => import("./features/registration/signup/Signup"));
const Login = lazy(() => import("./features/registration/login/Login"));
const Home = lazy(() => import("./features/home/Home"));

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />, // Custom error page
        children: [
            { path: "*", element: <ErrorPage /> }, // Catch-all route
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ],
    },
]);

function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "./features/ui/Spinner"; // Loading spinner
import router from "./routers/Router";
import { AuthProvider } from "../context/authContext";


function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<Spinner />}>
                <RouterProvider router={router} />
            </Suspense>
        </AuthProvider>
    );
}

export default App;
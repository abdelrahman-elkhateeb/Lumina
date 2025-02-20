import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "./app/features/ui/Spinner"; // Loading spinner
import router from "./routers/Router";


function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "./app/features/ui/Spinner"; // Loading spinner
import router from "./routers/Router";
import LightBulbLoader from "./app/features/ui/LightBulbLoader";


function App() {
    return (
        <div className="text-text">
            <Suspense fallback={<LightBulbLoader />}>
            <RouterProvider router={router} />
        </Suspense>
        </div>
    );
}

export default App;
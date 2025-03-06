import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "./routers/Router";
import LightBulbLoader from "./app/features/ui/LightBulbLoader";


function App() {
    return (
        <div className="text-site-text">
            <Suspense fallback={<LightBulbLoader />}>
                <RouterProvider router={router} />
            </Suspense>
        </div>
    );
}

export default App;
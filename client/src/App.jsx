import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./features/registration/signup/Signup";
import Login from "./features/registration/login/Login";

const router = createBrowserRouter([
{path:"/",element:<h1>welcome to home page</h1>},
{path:"/login",element:<Login/>},
{path:"/signup",element:<Signup/>},
])

function App() {
    return <RouterProvider router={router} />;
}

export default App;

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-4 mt-5">
        <Outlet />
      </section>

    </>
  )
}

export default AppLayout

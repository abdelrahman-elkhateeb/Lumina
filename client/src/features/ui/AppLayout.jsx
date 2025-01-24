import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>

    </>
  )
}

export default AppLayout

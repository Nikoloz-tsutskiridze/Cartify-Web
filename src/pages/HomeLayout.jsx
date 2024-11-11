import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";

function HomeLayout() {
  return (
    <>
      <Header />
      <Navbar />

      <section className="aling-element py-20">
        <Outlet />
      </section>
    </>
  );
}

export default HomeLayout;

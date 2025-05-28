import { Outlet } from "react-router";

import Footer from "../../shared/Footer";
import Navber from "../../shared/Navber";

export default function Rootlayout() {
  return (
    <div className="container mx-auto flex flex-col">
      <div>
        <Navber />
      </div>
      <div className=" bg-gray-50 sm:p-5">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

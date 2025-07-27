import { Outlet } from "react-router";
import Footer from "../../shared/Footer";
import SitBer from "./SitBer";

export default function DashboardLayout() {
  return (
    <div className="mx-auto flex flex-col bg-slate-800">
      <div>header</div>
      <div className="flex flex-row w-full">
        <div className="w-[300px] bg-stone-700 text-white h-full">
          <SitBer />
        </div>
        <div className="w-full bg-gray-50 sm:p-5 ">
          <Outlet />
        </div>
      </div>
      <div className="bg-slate-800">
        <Footer />
      </div>
    </div>
  );
}

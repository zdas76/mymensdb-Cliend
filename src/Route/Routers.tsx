import { Route, Routes } from "react-router";
import Rootlayout from "../Components/layout/Rootlayout";

import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import FindAdvocate from "../Pages/FindAdvocate";
import Advocate from "../Pages/Advocate";

import { lazy } from "react";
import DashboardLayout from "../Components/layout/Dashboardlayout";
import DashHome from "../Pages/Dashboard/DashHome";

const Leaderboard = lazy(() => import("../Pages/Leaderboard"));

export default function Routers() {
  return (
    <div>
      <Routes>
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/find_advocate" element={<FindAdvocate />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/advocate" element={<Advocate />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashHome />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

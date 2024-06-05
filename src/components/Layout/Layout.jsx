import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <React.Fragment>
      <Navbar />
      <div className=" mx-auto">
        <Outlet className="py-14 mx-auto"></Outlet>
      </div>
      <Footer />
    </React.Fragment>
  );
}

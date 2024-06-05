import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { create } from "../../Context/CartContext";

export default function Navbar() {
  let { getItem, cartCount } = useContext(create);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate("/login");
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    getItem(); // جلب عدد المنتجات عند تحميل الـNavbar
  }, []);

  return (
    <React.Fragment>
      <nav className="fixed top-0 left-0 right-0 z-50 p-3 bg-[#fcfcfc] py-4">
        <div className="flex items-center mx-auto pt-0 justify-between">
          <div className="text-black items-center font-bold text-xl mx-3">
            <Link className="items-center text-green-600 justify-center  hover:text-green-600 text-lg" to="/home">
              <i className=" fa-solid fa-cart-shopping mx-3"></i>
              flash Market
            </Link>

          </div>
          {/* <div className="text-black md-hidden flex items-center font-bold text-xl mx-3">
            <Link className="flex items-center text-green-600 justify-center hover:text-green-600 text-lg" to="/home">
              <i className="fa-solid fa-cart-shopping mx-3"></i>
              flash Market
            </Link>
          </div> */}
          <div className="hidden md:block me-auto">
            <ul className="flex items-center space-x-1">
              {userLogin !== null ? <>
                <li><NavLink to="home" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Home</NavLink></li>
                <li><NavLink to="cart" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Cart</NavLink></li>
                <li><NavLink to="products" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Products</NavLink></li>
                <li><NavLink to="brands" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Brands</NavLink></li>
                <li><NavLink to="categories" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Categories</NavLink></li>
              </> : null}
            </ul>
          </div>
          <div className="flex items-center ms-auto">
            <ul className="lg:flex hidden space-x-3">
              <li><i className="fa-brands fa-facebook"></i></li>
              <li><i className="fa-brands fa-twitter"></i></li>
              <li><i className="fa-brands fa-instagram"></i></li>
              <li><i className="fa-brands fa-youtube"></i></li>
              <li><i className="fa-brands fa-tiktok"></i></li>
            </ul>
            <ul className="md:flex hidden space-x-2">
              {userLogin == null ? <>
                <li><NavLink to="login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink></li>
                <li><NavLink to="register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink></li>

              </> : <>
                <li className="relative mx-3 ms-4">
                  <Link to={`cart`}>
                    <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold  rounded-full">{cartCount}</span>
                    <i className="text-green-600 fa-solid fa-cart-shopping"></i>
                  </Link>
                </li>
                <li onClick={logOut} className="mx-3 cursor-pointer"><span className="hoverNav p-2 text-base font-normal text-black">Logout</span></li>
              </>

              }


            </ul>
            <Link to={`cart`} className="mx-6 relative  md:hidden flex">
              <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold  rounded-full">{cartCount}</span>
              <i className="text-green-600 fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
          <div className="md:hidden hoverNav mx-3">
            <button onClick={toggleMobileMenu} className="outline-none  p-2  mobile-menu-button">
              <svg className="w-6 hoverNav h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${isMobileMenuOpen ? "" : "hidden"} md:hidden`}>
          <ul className="mt-4 text-start space-y-7">
            {userLogin !== null ? <>
              <li><NavLink to="home" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Home</NavLink></li>
              <li><NavLink to="cart" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Cart</NavLink></li>
              <li><NavLink to="products" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Products</NavLink></li>
              <li><NavLink to="brands" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Brands</NavLink></li>
              <li><NavLink to="categories" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Categories</NavLink></li>
            </> : null}
            <ul className="flex space-x-2">
              {userLogin == null ? <>
                <li><NavLink to="login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink></li>
                <li><NavLink to="register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink></li>

              </> : <>
                <li className="relative md:flex hidden">
                  <Link to={`cart`}>
                    <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold  rounded-full">{cartCount}</span>
                    <i className="text-green-600 fa-solid fa-cart-shopping"></i>
                  </Link>
                </li>
                <li onClick={logOut} className=" font-semibold text-base text-black cursor-pointer"><span className="hoverNav p-2 text-base font-normal text-black">Logout</span></li>
              </>
              }
            </ul>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}
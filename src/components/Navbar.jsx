// import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import cartIcon from "../assets/cartIcon.png";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" alt="logo-img" className="h-14" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              {cart.length > 0 && (
                <div className="absolute -right-2 -top-1 bg-green-600 text-xs h-5 w-5 flex justify-center items-center animate-bounce rounded-full text-white">
                  <span>{cart.length}</span>
                </div>
              )}
              {/* <FaCartShopping className="text-2xl" /> */}
              <img src={cartIcon} alt="cartIcon" height="30px" width="30px" />
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

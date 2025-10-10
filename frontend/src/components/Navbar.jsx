import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to="/">HOME</NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">COLLECTION</NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">ABOUT</NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">CONTACT</NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Profile Dropdown */}
        {token ? (
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <img
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="profile"
            />
            {dropdownOpen && (
              <div className="absolute right-0 top-6 flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md z-50">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            )}
          </div>
        ) : (
          <img
            onClick={() => navigate("/login")}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="login"
          />
        )}

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="cursor-pointer flex items-center gap-4 p-3">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
          {token && (
            <>
              <p onClick={() => { logout(); setVisible(false); }} className="py-2 pl-6 border cursor-pointer">Logout</p>
              <p onClick={() => { navigate("/orders"); setVisible(false); }} className="py-2 pl-6 border cursor-pointer">Orders</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;




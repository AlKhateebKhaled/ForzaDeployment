import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaSun,
  FaMoon,
  FaBars,
  FaHome,
  FaSignOutAlt,
  FaShoppingCart,
  FaSignInAlt,
  FaList,
  FaDollarSign,
} from "react-icons/fa";
import "./style.css";
import { AppContext } from "../../App";

const Dropdown = ({ title, options, isOpen, toggle }) => (
  <div className="dropdown">
    <div
      className="dropdown-toggle"
      onClick={toggle}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {title}
    </div>
    {isOpen && (
      <div className="dropdown-list open">
        {options.map((option) => (
          <NavLink
            key={option.label}
            to={option.path}
            className="dropdown-item"
            activeClassName="active"
            onClick={() => {
              toggle();
            }}
          >
            {option.label}
          </NavLink>
        ))}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const {
    token,
    userName,
    setToken,
    cartItems,
    cartCount,
    isDarkMode,
    setIsDarkMode,
  } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleisDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("userName");
    setToken(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?team=${searchQuery}`);
      setSearchQuery("");
    }
    setShowMobileSearch(false);
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <>
        {showMobileSearch && (
          <div className="mobile-search-modal">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search for a team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-button">
                Search
              </button>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowMobileSearch(false)}
              >
                Close
              </button>
            </form>
          </div>
        )}
      </>
      <div className="right-side">
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars />
        </div>
        <div>
          {token ? (
            <div className="user-info">
              <span
                className="icon-button-user"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                {userName ? userName : "User"}
              </span>
              <button onClick={logout} className="icon-button">
                <FaSignOutAlt />
              </button>
              <NavLink to="/wishlist" className="icon-button">
                <FaHeart />
              </NavLink>
              <NavLink to="/cart" className="icon-button">
                <div className="cart-icon">
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </div>
              </NavLink>
            </div>
          ) : (
            <NavLink to="/login" className="icon-button">
              <FaUser />
            </NavLink>
          )}
        </div>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <NavLink
            exact
            to="/"
            activeClassName="active"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/Categories"
            activeClassName="active"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaList /> Categories
          </NavLink>
          <NavLink
            to="/wishlist"
            activeClassName="active"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHeart /> WishList
          </NavLink>
          <NavLink to="/cart">
            <FaShoppingCart /> Cart
          </NavLink>
          <Dropdown
            title={
              <span>
                <FaSignInAlt /> Login / Register
              </span>
            }
            options={[
              { label: "Login", path: "/login" },
              { label: "Register", path: "/register" },
            ]}
            isOpen={isDropdownOpen.loginRegister}
            toggle={() => toggleDropdown("loginRegister")}
          />

          <Dropdown
            title={
              <span>
                <FaDollarSign /> Currency
              </span>
            }
            options={[
              { label: "Jordanian Dinar", path: "/currency/jd" },
              { label: "Dollar", path: "/currency/usd" },
            ]}
            isOpen={isDropdownOpen.currency}
            toggle={() => toggleDropdown("currency")}
          />
        </div>
        <NavLink to="/" className="icon-button">
          <FaHome />
        </NavLink>
      </div>
      <div className="logo">
        <h1>Forza</h1>
      </div>
      <div className="right-side">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
          <button
            type="button"
            className="mobile-search-icon"
            onClick={() => setShowMobileSearch(true)}
          >
            <FaSearch />
          </button>
        </form>

        <button className="icon-button" onClick={handleisDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

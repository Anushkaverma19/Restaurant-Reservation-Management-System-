import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkStyle = ({ isActive }) =>
    `transition duration-300 ${
      isActive
        ? "text-yellow-400"
        : "text-white hover:text-yellow-400"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xl">
            <FaUtensils />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              ReserveEase
            </h1>

            <p className="text-xs text-gray-300">
              Restaurant Reservation
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={navLinkStyle}
          >
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={navLinkStyle}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={navLinkStyle}
              >
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated &&
            user?.role === "user" && (
              <>
                <NavLink
                  to="/dashboard"
                  className={navLinkStyle}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/create-reservation"
                  className={navLinkStyle}
                >
                  Book Table
                </NavLink>

                <NavLink
                  to="/my-reservations"
                  className={navLinkStyle}
                >
                  My Reservations
                </NavLink>
              </>
            )}

          {isAuthenticated &&
            user?.role === "admin" && (
              <>
                <NavLink
                  to="/admin"
                  className={navLinkStyle}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/reservations"
                  className={navLinkStyle}
                >
                  Reservations
                </NavLink>

                <NavLink
                  to="/admin/tables"
                  className={navLinkStyle}
                >
                  Tables
                </NavLink>
              </>
            )}
        </div>

        {/* Right Side */}

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-yellow-400 font-medium">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition"
            >
              Reserve Now
            </Link>
          )}
        </div>

        {/* Mobile Button */}

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-slate-900 px-6 pb-6 flex flex-col gap-5">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={navLinkStyle}
          >
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={navLinkStyle}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className={navLinkStyle}
              >
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated &&
            user?.role === "user" && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={navLinkStyle}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/create-reservation"
                  onClick={closeMenu}
                  className={navLinkStyle}
                >
                  Book Table
                </NavLink>

                <NavLink
                  to="/my-reservations"
                  onClick={closeMenu}
                  className={navLinkStyle}
                >
                  My Reservations
                </NavLink>
              </>
            )}

          {isAuthenticated &&
            user?.role === "admin" && (
              <>
                <NavLink
                  to="/admin"
                  onClick={closeMenu}
                  className={navLinkStyle}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/reservations"
                  onClick={closeMenu}
                  className={navLinkStyle}
                >
                  Reservations
                </NavLink>

                <NavLink
                  to="/admin/tables"
                  onClick={closeMenu}
                  className={navLinkStyle}
                >
                  Tables
                </NavLink>
              </>
            )}

          {isAuthenticated && (
            <button
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="bg-yellow-500 text-black py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
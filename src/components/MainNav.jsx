import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

export default function MainNav() {
  const token = useEcomStore((state) => state.token);
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const actionLogout = useEcomStore((state) => state.actionLogout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-teal-500 shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16 ">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>

            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium"
                  : "px-3 py-1 text-sm font-medium hover:bg-gray-200 rounded-lg"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium"
                  : "px-3 py-1 text-sm font-medium hover:bg-gray-200 rounded-lg"
              }
            >
              Shop
            </NavLink>
            {/* Badge */}
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium"
                  : "px-3 py-1 text-sm font-medium hover:bg-gray-200 rounded-lg"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-2 bg-red-500 rounded-full text-white px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-teal-400 px-2 py-3 rounded-md"
              >
                <img
                  className="w-8 h-8"
                  src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                />
                <ChevronDown />
              </button>
              {isOpen && (
                <div className="absolute top-16 bg-teal-400 shadow-md  ">
                  <Link className="block hover:bg-teal-200 px-4 py-2 ">History</Link>
                  <Link
                    onClick={() => {
                      actionLogout();
                      setIsOpen(false);
                    }}
                    className="block hover:bg-teal-200 px-4 py-2 "
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium"
                    : "px-3 py-1 text-sm font-medium hover:bg-gray-200 rounded-lg"
                }
              >
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium"
                    : "px-3 py-1 text-sm font-medium hover:bg-gray-200 rounded-lg"
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

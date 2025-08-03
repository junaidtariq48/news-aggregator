import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth(); // get user & logout logic

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 dark:text-white"
          >
            Today News
          </Link>
        </div>

        <div
          className="flex items-center gap-5 text-gray-600 dark:text-gray-300 relative"
          ref={dropdownRef}
        >
          <button onClick={() => setDark(!dark)} title="Toggle theme">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1"
              >
                <img
                  src="https://i.pravatar.cc/32"
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <FontAwesomeIcon icon={faAngleDown} className="text-xs" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-50 text-sm">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <div className="font-medium dark:text-white">
                      {user?.name ?? "Guest"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Logged in
                    </div>
                  </div>
                  <Link
                    to="/preferences"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  >
                    Preferences
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false); // ✅ hide dropdown
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

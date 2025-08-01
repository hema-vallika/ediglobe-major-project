"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "./ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice.js"; // Adjust the import path as necessary

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { lable: "Home", path: "#home" },
    { lable: "Features", path: "#features" },
    { lable: "Student", path: "/student-management" },
    { lable: "Course", path: "/course-management" },
    { lable: "Fees", path: "/fees-management" },
    { lable: "About", path: "#about" },
    { lable: "Contact", path: "#contact" },
  ];

  const goToHomeSection = (section) => {
    setIsMenuOpen(false);
    navigate("/", { state: { scrollTo: section } });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-800 outline-none">
              EduManage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) =>
              link.path.includes("#") ? (
                <a
                  key={link.lable + index}
                  onClick={() => goToHomeSection(link.path.replace("#", ""))}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                >
                  {link.lable}
                </a>
              ) : (
                <Link
                  key={link.lable + index}
                  to={link.path}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.lable}
                </Link>
              )
            )}

            {/* <Link
              href="/"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </a>
            <Link
              href="#about"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link> */}
          </div>

          {/* Desktop Auth Buttons */}
          {token ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="hidden lg:block bg-blue-600 text-white hover:bg-blue-700"
            >
              Logout
            </Button>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to={"/auth/login"}>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/auth/signup"}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#features"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                {!token ? (
                  <>
                    <Link
                      to={"/auth/login"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      to={"/auth/signup"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(logout());
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

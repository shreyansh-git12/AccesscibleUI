import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-8 py-4  bg-white">
      <Link
        to="/"
        className="font-bold text-2xl tracking-wide text-gray-700 flex items-center gap-2"
      >
        AccessibleUI
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {["/", "/how-it-works", "/about", "/contact"].map((path, index) => (
          <Link
            key={index}
            to={path}
            className="text-md font-semibold text-gray-700 hover:text-gray-900 transition-colors"
          >
            {path === "/"
              ? "Home"
              : path
                  .replace("-", " ")
                  .slice(1)
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
          </Link>
        ))}

        {!user ? (
          <Link to="/login">
            <Button className="py-2 px-6 rounded-md bg-gray-700 hover:bg-gray-900 text-white">
              Login
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-gray-900 transition-colors border px-2 rounded-full border-gray-300">
                {user.name}
                <svg
                  className="w-3 h-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 mt-2 shadow-lg rounded-md bg-white border">
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  className="w-full px-4 py-2 hover:bg-gray-100 rounded-sm"
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/edit-profile"
                  className="w-full px-4 py-2 hover:bg-gray-100 rounded-sm"
                >
                  Edit Token
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="w-full px-4 py-2 hover:bg-gray-100 rounded-sm cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden text-gray-700 text-3xl p-0"
          >
            <FiMenu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-gray-100 text-gray-700 p-6 flex flex-col gap-4"
        >
          {["/", "/how-it-works", "/about", "/contact"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className="text-lg font-semibold hover:text-gray-900 transition-colors"
            >
              {path === "/"
                ? "Home"
                : path
                    .replace("-", " ")
                    .slice(1)
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-lg font-semibold hover:text-accent transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/edit-profile"
                className="text-lg font-semibold hover:text-accent transition-colors"
              >
                Edit Token
              </Link>
              <button
                onClick={logout}
                className="text-xl font-semibold bg-gray-700 text-white hover:bg-gray-900 transition-color"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <Button className="py-2 px-6 rounded-md bg-gray-700 text-white hover:bg-gray-900 transition-colors">
                Login
              </Button>
            </Link>
          )}
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../state/userSlice";
import axiosInstance from "../services/axiosInstance";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const handleMouseEnter = () => {
    // Clear any previous hide timeout if it exists
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the dropdown after a short delay
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 300); // Adjust the timeout duration to your preference (in ms)

    setHideTimeout(timeout);
  };

  const userInfo = useSelector((state) => state.userInfo);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("api/token/logout/", {
        refresh: localStorage.getItem("refresh_token"),
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-header-black text-white shadow-md">
        <nav className="relative mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div
              className="cursor-pointer  sm:ml-20 flex items-center"
              onClick={() => navigate("/home")}
            >
              Trackly
            </div>
            <div className="cursor-pointer" onClick={() => navigate("/home")}>
              Home
            </div>
          </div>

          <div
            className="ml-auto relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="cursor-pointer sm:mr-30">My Profile</span>

            <div
              className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50 transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="px-4 py-2 text-xs text-gray-400">
                User {userInfo.username}
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

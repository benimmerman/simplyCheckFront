import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice";
import axiosInstance from "../services/axiosInstance";
// import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const modalRef = useRef(null);

  const buttonStyle =
    "bg-white bg-opacity-70 px-4 py-2 rounded-xl shadow-md hover:shadow-xl hover:bg-opacity-100 hover:bg-sky-300 transition-all text-gray-700 font-semibold";

  const modalButtonStyle =
    "px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all";

  // Close modal if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogoutConfirm(false);
      }
    };

    if (showLogoutConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutConfirm]);

  const handleLogout = () => {
    // Clear user info in Redux
    dispatch(logoutUser());
    axiosInstance.get('logout/')
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-sky-300/40 shadow-md">
        <nav className="flex items-center justify-between px-4 py-3">
          <button className={buttonStyle} onClick={() => navigate("/home")}>
            Home
          </button>
          <div className="grow">
            <h1 className="flex justify-center text-xl font-semibold text-gray-700">
              Simply Check
            </h1>
          </div>
          <button
            className={buttonStyle}
            onClick={() => setShowLogoutConfirm(true)}
          >
            Log Out
          </button>
        </nav>
      </header>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50 backdrop-blur-sm transition-opacity duration-200">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl p-6 space-y-4 text-center w-72"
          >
            <p className="text-gray-800 font-semibold">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className={`${modalButtonStyle} bg-sky-500 text-white hover:bg-sky-600`}
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className={`${modalButtonStyle} bg-gray-200 hover:bg-gray-300 text-gray-800`}
                onClick={() => setShowLogoutConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

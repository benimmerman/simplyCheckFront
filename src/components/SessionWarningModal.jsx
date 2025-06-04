import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import { resetCountdown } from "../state/countdownSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Spinner } from "./helpers/Spinner";

const SessionWarningModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleExtend = async () => {
    setShowSpinner(true);

    axiosInstance
      .post("api/token/refresh/", {
        refresh: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        setShowSpinner(false);
        dispatch(resetCountdown()); // Restart the 15-minute countdown
      })
      .catch(() => {
        setShowSpinner(false);
        dispatch(resetCountdown());
      });
  };

  const handleLogout = () => {
    axiosInstance
      .post("api/token/logout/", {
        refresh: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        dispatch(logoutUser());
        dispatch(resetCountdown());
      })
      .catch(() => {
        dispatch(resetCountdown());
        dispatch(logoutUser());
      });

    navigate("/");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[480px] text-center transform transition-all">
        <div className="mb-6">
          <h2 className="text-xl text-gray-800 mb-4">Say Logged In?</h2>
          <p className="text-sm text-gray-500 mb-4">
            {" "}
            Your session is expiring{" "}
            <span className="font-bold text-red-600 mr-1">
              {formatTime(timeLeft)}
            </span>
            minutes. Do you want to stay logged in?
          </p>
        </div>
        <div className="flex justify-end">
          {showSpinner ? (
            <Spinner />
          ) : (
            <button
              onClick={handleExtend}
              className="cursor-pointer uppercase p-2 rounded-md border-2 border-dark-purple text-white
             transition duration-300 bg-dark-purple hover:bg-dark-purple/90 hover:scale-105 transform"
            >
              Extend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionWarningModal;

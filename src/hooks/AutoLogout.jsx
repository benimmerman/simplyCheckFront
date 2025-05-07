import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";

const useAutoLogout = (timeout = 600000) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let logoutTimer;
    let warningTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      setShowWarning(false);

      // Show warning 1 minute before timeout
      warningTimer = setTimeout(() => {
        setShowWarning(true);
      }, timeout - 60000);

      logoutTimer = setTimeout(() => {
        dispatch(logoutUser());
        navigate("/");
      }, timeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // Initialize timers on mount

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [dispatch, navigate, timeout]);

  return showWarning;
};

export default useAutoLogout;

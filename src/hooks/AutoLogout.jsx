// AutoLogout.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../state/userSlice"; // adjust path as needed
import { useNavigate } from "react-router-dom";

let timer;

const useAutoLogout = (timeout = 60000) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(logoutUser());
        navigate("/"); // Redirect to login
      }, timeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer(); // Start the timer

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [dispatch, navigate, timeout]);
};

export default useAutoLogout;

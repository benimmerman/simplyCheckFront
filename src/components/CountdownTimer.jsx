import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementTime } from "../state/countdownSlice";

const CountdownTimer = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state) => state.countdown.timeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default CountdownTimer;

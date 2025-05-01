import React, { useEffect } from "react";
import "../css/index.css";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const API_URL = "home/";
  const LIST_API_URL = "list/";
  // create navigate to use for nav
  const navigate = useNavigate();
  // create dispatch to save values globally
  // const dispatch = useDispatch();
  // create userInfo from global state "state", userSlice named "userInfo"
  const userInfo = useSelector((state) => state.userInfo);
  console.log(["userInfo:", userInfo]);

  useEffect(() => {
    if (!userInfo.username) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (userInfo?.username) {
      axiosInstance
        .get(API_URL)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error("Failed to fetch home data", err);
        });
    }
  }, [userInfo]);

  const handleNewList = () => {
    axiosInstance
      .post(LIST_API_URL)
      .then((res)=> {
        console.log(res)
      });
  };

  return (
    <>
      <div className="flex bg-sky-100 bg-opacity-40 backdrop-filter rounded-3xl shadow-lg mt-4 p-6 space-y-3">
        <div className="w-28"></div>
        <div className="grow self-center">
          <h1 className="justify-center text-xl font-semibold text-center text-gray-700">
            Home Dashboard
          </h1>
        </div>
        <button
          className="self-center bg-white bg-opacity-70 py-3 w-28 rounded-xl shadow-md hover:shadow-xl hover:bg-opacity-100 hover:bg-sky-300 transition-all text-gray-700 font-semibold"
          onClick={handleNewList}
        >
          New List
        </button>
      </div>
    </>
  );
};

export default HomePage;

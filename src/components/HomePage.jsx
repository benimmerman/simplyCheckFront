import React, { useEffect, useState } from "react";
import "../css/index.css";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectList } from "../state/listSlice";

const HomePage = () => {
  const API_URL = "home/";
  const NEW_LIST_API_URL = "newList/";
  // create navigate to use for nav
  const navigate = useNavigate();
  // create dispatch to save values globally
  const dispatch = useDispatch();
  // create userInfo from global state "state", userSlice named "userInfo"
  const userInfo = useSelector((state) => state.userInfo);
  const listInfo = useSelector((state) => state.listInfo);
  const [userLists, setUserLists] = useState({});

  // checks if there is a valid username in global state, if not get sent back to home page
  useEffect(() => {
    if (!userInfo.username) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // request sent to fetch all the lists owned by the user
  useEffect(() => {
    if (userInfo?.username) {
      axiosInstance
        .get(API_URL)
        .then((res) => {
          console.log(res.data.lists);
          setUserLists(res.data.lists);
        })
        .catch((err) => {
          console.error("Failed to fetch home data", err);
        });
    }
  }, [userInfo]);

  const handleNewList = () => {
    axiosInstance
      .post(NEW_LIST_API_URL, {
        username: userInfo.username,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectList = (index) => {
    console.log(index);
    dispatch(
      selectList({
        listId: userLists.filter((_, i) => i === index),
      })
    );
    console.log('listId:',listInfo.listId)
    navigate("/list");
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
      <div className="flex-auto ">
        <div className="w-full px-8 mt-8 justify-self-center grid h-56 grid-cols-3 content-start gap-4">
          {userLists.length > 0 &&
            userLists.map((item, index) => (
              <div key={index} className="">
                <div
                  className="bg-sky-100 p-4 rounded-xl text-center text-gray-700 text-lg font-medium shadow-md hover:shadow-xl hover:bg-opacity-100"
                  onClick={() => handleSelectList(index)}
                >
                  {item["listTitle"]}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

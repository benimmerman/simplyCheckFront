import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectList } from "../state/listSlice";
import { TrashIcon } from "@heroicons/react/24/outline";

const HomePage = () => {
  const HOME_API_URL = "home/";
  const NEW_LIST_API_URL = "newList/";
  const DELETE_LIST_API_URL = "deleteList/";
  // create navigate to use for nav
  const navigate = useNavigate();
  // create dispatch to save values globally
  const dispatch = useDispatch();
  // create userInfo from global state "state", userSlice named "userInfo"
  const userInfo = useSelector((state) => state.userInfo);
  // const listInfo = useSelector((state) => state.listInfo);
  const [userLists, setUserLists] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const modalRef = useRef(null);

  const modalButtonStyle =
    "px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all";
  // checks if there is a valid username in global state, if not get sent back to home page
  useEffect(() => {
    if (!userInfo.username) {
      navigate("/");
    }
  }, [userInfo.username, navigate]);

  // request sent to fetch all the lists owned by the user
  useEffect(() => {
    if (userInfo?.username) {
      axiosInstance
        .get(HOME_API_URL)
        .then((res) => {
          setUserLists(res.data.lists);
        })
        .catch((err) => {
          console.error("Failed to fetch home data", err);
        });
    }
  }, [userInfo.username]);

  // Close modal if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDeleteConfirm(false);
      }
    };

    if (showDeleteConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteConfirm]);

  const handleNewList = () => {
    axiosInstance
      .post(NEW_LIST_API_URL, {
        username: userInfo.username,
      })
      .then((res) => {
        dispatch(
          selectList({
            listId: res.data.listId,
            listTitle: res.data.listTitle,
            fromNewList: true,
          })
        );
        navigate("/list");
      })
      .catch((err) => console.log(err));
  };

  const handleSelectList = (index) => {
    dispatch(
      selectList({
        listId: userLists.filter((_, i) => i === index)[0].listId,
        listTitle: userLists.filter((_, i) => i === index)[0].listTitle,
      })
    );
    navigate("/list");
  };

  const handleDeleteList = () => {
    setShowDeleteConfirm(false);
    axiosInstance
      .delete(DELETE_LIST_API_URL, {
        params: { listId: userLists[deleteIndex].listId },
      })
      .then(() => {
        const updatedLists = [...userLists];
        updatedLists.splice(deleteIndex, 1);
        setUserLists(updatedLists);
        setDeleteIndex(null);
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          console.error("Backend message:", err.response.data.message);
          // setErrorMessage(err.response.data.message);
        } else if (err.request) {
          console.error("No response from server:", err.request);
          // setErrorMessage("No response from server. Please try again.");
        } else {
          console.error("Error:", err.message);
          // setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  const handleConfirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirm(true);
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
      <div className="w-full px-8 mt-8 justify-self-center grid h-56 grid-cols-3 content-start gap-4">
        {userLists.length > 0 &&
          userLists.map((item, index) => (
            <div
              key={index}
              className="flex justify-self-center w-full bg-sky-100 p-4 rounded-xl text-center text-gray-700 text-lg font-medium shadow-md hover:shadow-xl hover:bg-sky-200 cursor-pointer transition-all"
            >
              <div className="w-full " onClick={() => handleSelectList(index)}>
                {item["listTitle"]}
              </div>
              <div className="justify-self-end self-center">
                <TrashIcon
                  className="size-5"
                  onClick={() => handleConfirmDelete(index)}
                />
              </div>
            </div>
          ))}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50 backdrop-blur-sm transition-opacity duration-200">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl p-6 space-y-4 text-center w-72"
          >
            <p className="text-gray-800 font-semibold">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className={`${modalButtonStyle} bg-gray-200 text-gray-800 hover:bg-gray-300`}
                onClick={handleDeleteList}
              >
                Yes
              </button>
              <button
                className={`${modalButtonStyle} bg-sky-500 text-white hover:bg-sky-600`}
                onClick={() => setShowDeleteConfirm(false)}
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

export default HomePage;

import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { TrashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

export const Checklist = () => {
  // create navigate to use for nav
  // const navigate = useNavigate();
  // // create dispatch to save values globally
  // const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const listInfo = useSelector((state) => state.listInfo);

  const LIST_API_URL = "list/";

  const [listItems, setListItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [listTitle, setListTitle] = useState(listInfo.listTitle);
  const [touched, setTouched] = useState(false)

  // when page loads retireve all the items for the list
  useEffect(() => {
    if (listInfo?.listId) {
      axiosInstance
        .get(`${LIST_API_URL}${userInfo.username}/${listInfo.listId}/`)
        .then((res) => {
          const items = res.data.listItems.map((item) => ({
            itemName: item.itemName,
            listItemId: item.id,
            isDone: item.isDone,
            notes: item.notes,
            createdWhen: item.createdWhen,
          }));
          setListItems(items);
          setListTitle(res.data.listTitle);
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
    }
  }, [listInfo.listId, userInfo.username]);

  // save whole input as inputValue
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // adds inputValue to listItems when user presses enter key and inputValue has valid characters
  const handleNewItem = (e) => {
    const checkValid = inputValue.trim().length > 0;
    if (e.key === "Enter" && checkValid) {
      axiosInstance
        .post(LIST_API_URL, {
          itemName: inputValue,
          listId: listInfo.listId,
          username: userInfo.username,
        })
        .then((res) => {
          setListItems([
            ...listItems,
            {
              itemName: inputValue,
              listItemId: res.data.id,
              isDone: false,
              createdWhen: res.data.createdWhen,
            },
          ]);
          console.log(res.data);
          setInputValue("");
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
    }
  };

  // deletes corresponding listItem when trash icon is clicked
  const handleItemDelete = (listItemId) => {
    axiosInstance
      .delete(LIST_API_URL, {
        params: { id: listItemId },
      })
      .then((res) => {
        console.log(res.data);
        const updatedListItems = [...listItems].filter(
          (item) => item.listItemId !== listItemId
        );
        setListItems(updatedListItems);
      });
  };

  const handleItemEdit = (e, listItemId) => {
    const newItemName = e.target.value;

    // Update listItems immutably
    const updatedList = listItems.map((item) =>
      item.listItemId === listItemId ? { ...item, itemName: newItemName } : item
    );

    setListItems(updatedList);
    // setEditedValues((prev) => ({
    //   ...prev,
    //   [listItemId]: e.target.value,
    // }));
  };

  // update listItams when an existing value is changed in the listRow
  const handleSaveItem = (listItemId, updatedFields) => {
    const item = listItems.find((i) => i.listItemId === listItemId);
    if (!item) return;
    console.log(["updatedFields", updatedFields]);
    axiosInstance
      .put(LIST_API_URL, {
        updateType: "item",
        username: userInfo.username,
        id: listItemId,
        ...updatedFields,
      })
      .then((res) => {
        console.log(res);
        console.log(["listItems", listItems]);
      })
      .catch((err) => {
        console.error("Error updating item:", err);
      });
  };

  const handleTitleEdit = (e) => {
    setListTitle(e.target.value);
  };

  const handleSaveTitle = (e) => {
    if (e.key === "Enter") {
      console.log(["list title:", listTitle]);
      axiosInstance
        .put(LIST_API_URL, {
          updateType: "title",
          username: userInfo.username,
          newListTitle: listTitle,
          listId: listInfo.listId,
        })
        .then((res) => {
          console.log(["save title res", res.data]);
          setListTitle(res.data.listTitle);
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
      e.target.blur();
    }
  };

  const handleToggleCheckbox = (itemId) => {
    // Find the current item
    const currentItem = listItems.find((item) => item.listItemId === itemId);
    const updatedIsDone = !currentItem.isDone;
    console.log(updatedIsDone);
    axiosInstance
      .put(LIST_API_URL, {
        updateType: "toggleCheck",
        username: userInfo.username,
        id: itemId,
        isDone: updatedIsDone,
      })
      .then(() => {
        const updatedList = listItems.map((item) =>
          item.listItemId === itemId ? { ...item, isDone: updatedIsDone } : item
        );
        setListItems(updatedList);
      })
      .catch((err) => {
        console.error("Error toggling item:", err);
      });
  };

  // listRow component is an object to not have to share state between components
  const listRow = (item) => {
    return (
      <div
        className="has-[input:focus]:border-dark-purple has-[input:focus]:border-2
      rounded-xl transition-all flex bg-opacity-30 backdrop-filter p-3 mt-2
       hover:shadow-xl border-b border-gray-200 "
      >
        <input
          value={item.itemName}
          key={item.listItemId}
          type="text"
          className={`flex-auto self-center bg-transparent outline-none mx-2 pl-2 font-semibold ${
            item.isDone ? "text-gray-400" : "text-gray-700"
          }`}
          onChange={(e) => handleItemEdit(e, item.listItemId)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSaveItem(item.listItemId, {
                itemName: listItems[item.listItemId] ?? item.itemName,
              });
              e.target.blur();
            }
          }}
        />
      </div>
    );
  };

  const sortListItems = [...listItems].sort((a, b) => {
    // Unchecked (false) comes before checked (true)
    if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
    return b.createdWhen.localeCompare(a.createdWhen); // newest first
  });
  console.log(["sortListItems", sortListItems]);

  return (
    <div className="max-w-7xl mx-auto  bg-opacity-40 backdrop-filter  mt-4 p-6 space-y-3">
      <div className="items-start justify-start text-uranian-blue text-center flex">
        <input
          value={listTitle}
          className="bg-transparent outline-none text-3xl font-semibold "
          type="text"
          onChange={(e) => handleTitleEdit(e)}
          onKeyDown={(e) => handleSaveTitle(e)}
        />
      </div>
      {/* new item input box - click to type, enter to submit to create a row */}
      <textarea
        value={inputValue}
        placeholder="Press enter to add item to list"
        onChange={handleInputChange}
        rows={2}
        onKeyDown={(e) => handleNewItem(e)}
        onBlur={() => setTouched(true)}
        className="bg-white shadow-sm rounded-xl px-4 py-2 w-full justify-center focus:outline-none focus:border-dark-purple focus:ring-2 focus:ring-dark-purple"
      />
      <p
        className={`text-red-500 text-xs flex items-center mt-1 w-full px-4 ${
          touched && inputValue.length > 1000
            ? "visible h-[1.25rem]"
            : "invisible h-0"
        }`}
      >
        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
        List item must not exceed 1000 characters.
      </p>
      {/* row display in the checklist, uses listRow component */}
      {listItems.length > 0 &&
        sortListItems.map((item) => (
          <div key={item.listItemId} className="flex">
            {/* Checkbox on the left */}
            <div className="flex-none mr-2 mt-4 self-center">
              <input
                className="w-6 h-6 border-2 border-gray-300 rounded-full appearance-none cursor-pointer transition-all duration-300 ease-in-out focus:outline-none checked:bg-dark-purple checked:border-dark-purple"
                type="checkbox"
                onChange={() => handleToggleCheckbox(item.listItemId)}
                checked={item.isDone}
              />
            </div>
            <div className="flex-1 justify-center">
              <AnimatePresence>
                <motion.div
                  key={item.listItemId}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  layout
                >
                  {listRow(item)}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex-none ml-2 self-center">
              <TrashIcon
                className="size-5 mt-2 cursor-pointer"
                onClick={() => handleItemDelete(item.listItemId)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

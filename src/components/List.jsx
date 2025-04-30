import React, { useState } from "react";
// import axios from 'axios';
import { TrashIcon } from "@heroicons/react/24/outline";

export const Checklist = () => {
  const [listItems, setListItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // save whole input as inputValue
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // adds inputValue to listItems when user presses enter key and inputValue has valid characters
  const handlePressEnter = (e) => {
    const checkValid = inputValue.trim().length > 0;
    if (e.key === "Enter" && checkValid) {
      setListItems([...listItems, { name: inputValue }]);
      setInputValue("");
    }
  };

  // deletes corresponding listItem when trash icon is clicked
  const handleDelete = (index) => {
    const listCopy = [...listItems];
    setListItems(listCopy.filter((_, i) => i !== index));
  };

  // update listItams when an existing value is changed in the listRow
  const handleItemEdit = (e, index) => {
    const updatedItems = [...listItems];
    updatedItems[index] = { ...updatedItems[index], name: e.target.value };
    setListItems(updatedItems);
  };

  // listRow component is an object to not have to share state between components
  const listRow = (item, index) => {
    return (
      <div className="border-2 border-transparent has-[input:focus]:border-sky-300 has-[input:focus]:shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] transition-all duration-200 ease-in-out flex bg-opacity-30 backdrop-filter pl-4 pr-8 py-2 mt-2 rounded-xl shadow-md hover:shadow-xl">
        {/* checkbox */}
        <input className="flex-none " type="checkbox" />
        {/* existing task displayed in the row, able to edit in place */}
        <input
          value={item.name}
          key={index}
          type="text"
          className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
          onChange={(e) => handleItemEdit(e, index)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className="bg-sky-100 bg-opacity-40 backdrop-filter rounded-3xl shadow-lg mt-4 p-6 space-y-3">
      <h2 className="text-xl font-semibold text-center text-gray-700">
        Checklist
      </h2>
      {/* input box- click to type, enter to submit to create a row */}
      <div className="rounded-xl  w-full">
        <input
          value={inputValue}
          placeholder="press enter to add"
          onChange={handleInputChange}
          onKeyDown={(e) => handlePressEnter(e)}
          className="bg-white shadow-sm rounded-xl px-4 py-2 w-full justify-center"
        ></input>
      </div>
      {/* row display in the checklist, uses listRow component */}
      {listItems.length > 0 &&
        listItems.map((item, index) => (
          // div for the row and delete button next to it
          <div key={index} className="flex">
            <div className="w-5/6 flex-none">{listRow(item, index)}</div>
            <div className="flex-none self-center mx-4">
              {listItems.length > 0 && (
                <TrashIcon
                  className="size-5 cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

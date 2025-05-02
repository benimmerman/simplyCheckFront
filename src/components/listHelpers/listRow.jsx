// import { TrashIcon } from "@heroicons/react/24/outline";

// export const ListItems = () => {
//   // deletes corresponding listItem when trash icon is clicked
//   const handleDelete = (index) => {
//     const listCopy = [...listItems];
//     setListItems(listCopy.filter((_, i) => i !== index));
//   };

//   // update listItams when an existing value is changed in the listRow
//   const handleItemEdit = (e, index) => {
//     const updatedItems = [...listItems];
//     updatedItems[index] = { ...updatedItems[index], name: e.target.value };
//     setListItems(updatedItems);
//   };


//   // listRow component is an object to not have to share state between components
//   const listRow = (item, index) => {
//     return (
//       <div className="border-2 border-transparent has-[input:focus]:border-sky-300 has-[input:focus]:shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] transition-all duration-200 ease-in-out flex bg-opacity-30 backdrop-filter pl-4 pr-8 py-2 mt-2 rounded-xl shadow-md hover:shadow-xl">
//         {/* checkbox */}
//         <input className="flex-none " type="checkbox" />
//         {/* existing task displayed in the row, able to edit in place */}
//         <input
//           value={item.name}
//           key={index}
//           type="text"
//           className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
//           onChange={(e) => handleItemEdit(e, index)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.target.blur();
//             }
//           }}
//         />
//       </div>
//     );
//   };

//   return (
//     <>
//       {listItems.length > 0 &&
//         listItems.map((item, index) => (
//           // div for the row and delete button next to it
//           <div key={index} className="flex">
//             <div className="w-5/6 flex-none">{listRow(item, index)}</div>
//             <div className="flex-none self-center mx-4">
//               {listItems.length > 0 && (
//                 <TrashIcon
//                   className="size-5 cursor-pointer"
//                   onClick={() => handleDelete(index)}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//     </>
//   );
// }
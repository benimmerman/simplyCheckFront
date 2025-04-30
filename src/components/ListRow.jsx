const ListRow = ({ item }) => {
    
    console.log(item)
    return (
      <div className="flex justify-between items-center bg-white bg-opacity-30 backdrop-filter pl-4 pr-8 py-2 mt-2 rounded-xl shadow-md hover:shadow-md transition">
        <span className="text-gray-700 font-semibold">{item.itemName}</span>
        <input type="checkbox"/>
      </div>
    )
};

export default ListRow;
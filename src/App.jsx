import { useState } from "react";
import ProductForm from "./components/ProductForm";
import Table from "./components/Table";
import { useInventory } from "./context/InventoryContext";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import logo from "./assets/pic.jpg";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { inventory } = useInventory();

  const filteredItems =
    selectedCategory === "All"
      ? inventory
      : inventory.filter((item) => item.category === selectedCategory);

  const sortedItems = [...filteredItems].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="relative">
      <div className="text-center text-2xl font-semibold my-5 flex items-center justify-center">
        <h1>Inventory Management</h1>
        <img src={logo} alt="logo" width={100} />
      </div>

      <div className="flex justify-center gap-10 mx-38 px-10 my-10">
        <div className="flex items-center gap-5">
          <div className="grid">
            <label className="py-2">Filter by Category </label>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All</option>
              {[...new Set(inventory.map((item) => item.category))].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="grid">
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Quantity :
            {sortOrder === "asc" ? (
              <FaSortAmountDown size={25} />
            ) : (
              <FaSortAmountUp size={25} />
            )}
          </button>
        </div>

        <div className=" my-5">
          <button
            className="bg-blue-400 px-4 py-2 rounded-md text-white"
            onClick={toggleModal}
          >
            Add Product
          </button>
        </div>
      </div>

      <Table items={sortedItems} />

      {isModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
          <ProductForm toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default App;

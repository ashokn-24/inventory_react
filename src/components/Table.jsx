/* eslint-disable react/prop-types */
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useInventory } from "../context/InventoryContext";
import { useState } from "react";
import Alert from "./Alert";
import ProductForm from "./ProductForm";

const Table = ({ items }) => {
  const { deleteProduct } = useInventory();
  const [isAlertVisible, setIsAlertVisible] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(null);

  const toggleAlert = (productId) => {
    setIsAlertVisible(isAlertVisible === productId ? null : productId);
  };

  const toggleModal = (productId) => {
    setIsModalVisible(isModalVisible === productId ? null : productId);
  };

  return (
    <div className="flex justify-center">
      <div className="relative overflow-x-auto w-[70%]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      item.quantity < 10 ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {item.quantity < 10 ? "Low Stock" : "In Stock"}
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => toggleModal(item.id)}
                      className="text-blue-600 dark:text-blue-500"
                    >
                      <AiFillEdit size={30} />
                    </button>
                    <button
                      onClick={() => toggleAlert(item.id)}
                      className="text-red-600 dark:text-red-500"
                    >
                      <AiFillDelete size={30} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAlertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <Alert
            toggleAlert={() => toggleAlert(null)}
            productId={isAlertVisible}
            deleteProduct={deleteProduct}
          />
        </div>
      )}

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <ProductForm
            toggleModal={() => toggleModal(null)}
            productId={isModalVisible}
          />
        </div>
      )}
    </div>
  );
};

export default Table;

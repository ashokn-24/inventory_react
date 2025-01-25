/* eslint-disable react/prop-types */
import { useInventory } from "../context/InventoryContext";

const Alert = ({ toggleAlert, productId }) => {
  const { deleteProduct } = useInventory();

  console.log(productId);

  const handleDelete = () => { 
    deleteProduct(productId);
    toggleAlert();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-[300px] text-center">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-4">
          Do you really want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Yes
          </button>

          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            onClick={toggleAlert}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;

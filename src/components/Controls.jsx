/* eslint-disable react/prop-types */
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Controls = ({ productId, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onEdit(productId)}
        className="text-blue-600 dark:text-blue-500"
      >
        <AiFillEdit size={30} />
      </button>
      <button
        onClick={() => onDelete(productId)}
        className="text-red-600 dark:text-red-500"
      >
        <AiFillDelete size={30} />
      </button>
    </div>
  );
};

export default Controls;

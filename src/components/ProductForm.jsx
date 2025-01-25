/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useInventory } from "../context/InventoryContext";

const ProductForm = ({ toggleModal, productId }) => {
  const initialFormState = {
    id: "",
    name: "",
    category: "",
    quantity: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const { inventory, addProduct, editProduct } = useInventory();

  useEffect(() => {
    if (productId) {
      const data = inventory.find((product) => product.id === productId);
      setFormData(data || initialFormState);
    } else {
      setFormData(initialFormState);
    }
  }, [productId, inventory]);

  useEffect(() => {
    if (!productId) {
      const id = inventory.length + 1;
      setFormData((prevData) => ({
        ...prevData,
        id: id,
      }));
    }
  }, [productId, inventory.length]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    productId ? editProduct(productId) : addProduct(formData);
    console.log(formData);
    toggleModal();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative">
        <div className="absolute top-30 right-0">
          <button onClick={toggleModal}>
            <AiOutlineClose size={30} />
          </button>
        </div>

        <div className="border border-gray-200 p-4 rounded-md w-[500px]">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 p-2 rounded-md focus:outline-none w-full mt-1"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="border border-gray-300 p-2 rounded-md focus:outline-none w-full mt-1"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="border border-gray-300 p-2 rounded-md focus:outline-none w-full mt-1"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="flex mt-4 p-2 w-full">
              <button className="bg-blue-400 px-4 py-2 w-full rounded-md text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;

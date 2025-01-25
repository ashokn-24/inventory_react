/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Apple",
      category: "Fruits",
      quantity: 5,
    },
    {
      id: 2,
      name: "Rice",
      category: "Grains",
      quantity: 20,
    },
    {
      id: 3,
      name: "Milk",
      category: "Dairy",
      quantity: 8,
    },
    {
      id: 4,
      name: "Bread",
      category: "Bakery",
      quantity: 12,
    },
  ]);

  const addProduct = (product) => {
    product.id = inventory.length + 1;
    setInventory([...inventory, product]);
  };

  const editProduct = (updatedProduct) => {
    setInventory(
      inventory.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const filterItem = (item) => {
    return inventory.filter((product) => product.id !== item.id);
  };

  const deleteProduct = (id) => {
    setInventory(inventory.filter((product) => product.id !== id));
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        setInventory,
        addProduct,
        editProduct,
        deleteProduct,
        filterItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);

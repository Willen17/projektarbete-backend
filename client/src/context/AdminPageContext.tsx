import { createContext, FC, useContext, useState } from "react";
import { useLocalStorageState } from "../components/hooks/useLocalStorageState";
import { makeRequest } from "../Helper";
import { ProductData } from "../ProductData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AdminContextValue {
  saveProduct: (product: ProductData, id: string) => void;
  addProduct: (product: ProductData) => void;
  removeProduct: (product: ProductData) => void;
}

export const ProductContext = createContext<AdminContextValue>({
  addProduct: () => {},
  saveProduct: () => {},
  removeProduct: () => {},
});

const ProductProvider: FC = (props) => {
  const navigate = useNavigate();

  const addProduct = async (newProduct: ProductData) => {
    if (!newProduct) return toast.error("No product");
    let response = await makeRequest("/api/product", "POST", newProduct);
    if (!response.ok) return toast.error(response);

    toast.success(newProduct.title + " added");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const removeProduct = async (productToBeRemoved: ProductData) => {
    if (!productToBeRemoved._id) return toast.error("NO ID");
    let response = await makeRequest(
      `/api/product/${productToBeRemoved._id}`,
      "DELETE"
    );
    if (!response.ok) return toast.error(response.data);

    toast.success("Product removed");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const saveProduct = async (editedProduct: ProductData, id: string) => {
    if (!id) return toast.error("No Product");
    let response = await makeRequest(
      `/api/product/${id}`,
      "PUT",
      editedProduct
    );
    if (!response.ok) return toast.error(response.data);
    toast.success(response.data);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <ProductContext.Provider
      value={{
        addProduct,
        saveProduct,
        removeProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useAdmin = () => useContext(ProductContext);

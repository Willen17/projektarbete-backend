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

  // /**
  //  * function that pushes new product to a new list and then updates LS
  //  * @param newProduct
  //  */
  const addProduct = async (newProduct: ProductData) => {
    console.log(newProduct);
    if (!newProduct) return toast.error("No product");
    let response = await makeRequest("/api/product", "POST", newProduct);
    if (!response.ok) return toast.error(response);
    toast.success(newProduct.title + " added");
  };

  // /**
  //  * function that removes a product, makes a new list and updates LS
  //  * @param productToBeRemoved
  //  */
  const removeProduct = async (productToBeRemoved: ProductData) => {
    // if (!productToBeRemoved._id) return console.log("Inget ID");
    console.log(productToBeRemoved._id);
    if (!productToBeRemoved._id) return toast.error("NO ID");
    let response = await makeRequest(
      `/api/product/${productToBeRemoved._id}`,
      "DELETE"
    );
    // console.log(response.status);
    console.log(response.ok);
    if (!response.ok) return toast.error(response);

    toast.success("Product removed");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  // /**
  //  * function that saves an edited product
  //  * @param editedProduct
  //  */
  const saveProduct = async (editedProduct: ProductData, id: string) => {
    if (!id) return toast.error("No Product");
    let response = await makeRequest(
      `/api/product/${id}`,
      "PUT",
      editedProduct
    );
    if (!response.ok) return toast.error(response);

    toast.success(response.data);

    // toast.success(editedProduct.title + " Edited");
    // const productExists = products.find(
    //   (item) => item.id === editedProduct._id
    // );
    // if (productExists) {
    //   setProducts(
    //     products.map((item) =>
    //       item.id === editedProduct._id ? { ...editedProduct } : item
    //     )
    //   );
    // } else {
    //   setProducts([...products, editedProduct]);
    // }

    // /**
    //  * makes a new list that contains the edited product, sets edit to false
    //  */
    // const editedProductList = products.map((item) => {
    //   if (editedProduct._id === item.id) {
    //     return editedProduct;
    //   }
    //   return item;
    // });
    // setProducts(editedProductList);
    // setEdit(false);
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

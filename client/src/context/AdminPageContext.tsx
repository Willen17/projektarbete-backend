import { createContext, FC, useContext, useState } from "react";
import { useLocalStorageState } from "../components/hooks/useLocalStorageState";
import { ProductData, productData } from "../ProductData";

interface AdminContextValue {

  products: ProductData[];
  isEdit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  saveProduct: (product: ProductData) => void;
  addProduct: (product: ProductData) => void;
  removeProduct: (product: ProductData) => void;
}

export const ProductContext = createContext<AdminContextValue>({
  products: [],
  isEdit: false,
  addProduct: () => {},
  setEdit: () => {},
  saveProduct: () => {},
  removeProduct: () => {},
});

const ProductProvider: FC = (props) => {
  const [products, setProducts] = useLocalStorageState(productData, "adminLS");
  const [isEdit, setEdit] = useState(false);

  /**
   * function that pushes new product to a new list and then updates LS
   * @param newProduct
   */
  const addProduct = (newProduct: ProductData) => {
    let newProductList = [...products];
    newProductList.push(newProduct);
    setProducts(newProductList);
  };

  /**
   * function that removes a product, makes a new list and updates LS
   * @param productToBeRemoved
   */
  const removeProduct = (productToBeRemoved: ProductData) => {
    const updatedProductList = products.filter(
      (product) => productToBeRemoved.id !== product.id
    );
    setProducts(updatedProductList);
  };

  /**
   * function that saves an edited product
   * @param editedProduct
   */
  const saveProduct = (editedProduct: ProductData) => {
    const productExists = products.find((item) => item.id === editedProduct.id);
    if (productExists) {
      setProducts(
        products.map((item) =>
          item.id === editedProduct.id ? { ...editedProduct } : item
        )
      );
    } else {
      setProducts([...products, editedProduct]);
    }


    /**
     * makes a new list that contains the edited product, sets edit to false
     */
    const editedProductList = products.map((item) => {
      if (editedProduct.id === item.id) {
        return editedProduct;
      }
      return item;
    });
    setProducts(editedProductList);
    setEdit(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isEdit,
        setEdit,
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

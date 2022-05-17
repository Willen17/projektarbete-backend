import { createContext, FC, useContext, useState } from "react";
import { useLocalStorageState } from "../components/hooks/useLocalStorageState";
import { ProductData } from "../ProductData";
import { ShippingProvider } from "../ShippingProviderData";

export interface ItemData extends ProductData {
  quantity: number;
}
interface CartContextValue {
  cart: ItemData[];
  shipper: ShippingProvider;
  paymentMethod: String;
  isSwish?: Boolean;
  isCreditCard?: Boolean;
  isInvoice?: Boolean;
  selectSwish: () => void;
  selectCreditCard: () => void;
  selectInvoice: () => void;
  addToCart: (product: ProductData) => void;
  onAddQuantity: (product: ItemData) => void;
  onReduceQuantity: (product: ItemData) => void;
  removeFromCart: (product: ItemData) => void;
  emptyCart: () => void;
  selectShippment: (provider: ShippingProvider) => void;
  selectPaymentMethod: (method: String) => void;
}

export const CartContext = createContext<CartContextValue>({
  cart: [],
  shipper: {
    providerName: "",
    cost: 0,
    deliveryTime: "",
  },
  paymentMethod: "",
  selectSwish: () => {},
  selectCreditCard: () => {},
  selectInvoice: () => {},
  addToCart: () => {},
  onAddQuantity: () => {},
  onReduceQuantity: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
  selectShippment: () => {},
  selectPaymentMethod: () => "",
});

const CartProvider: FC = (props) => {
  const [cart, setCart] = useLocalStorageState<ItemData[]>([], "cc-cart");
  const [shipper, setShipper] = useState<ShippingProvider>({
    providerName: "Postnord",
    cost: 495,
    deliveryTime: "3-5 Weekdays",
  });
  const [paymentMethod, setPaymentMethod] = useState<String>("");
  const [isCreditCard, setIsCreditCard] = useState<Boolean>(true);
  const [isSwish, setIsSwish] = useState<Boolean>(false);
  const [isInvoice, setIsInvoice] = useState<Boolean>(false);

  /** add items to cart: if the item does not exist in the cart, add; otherwise increase quantity by 1 */
  const addToCart = async (product: ProductData) => {
    if (cart.some((item) => item.id === product.id)) {
      const updatedCart = cart.map((item) => {
        if (product.id !== item.id) return item;
        return { ...item, quantity: item.quantity + 1 };
      });
      setCart(updatedCart);
    } else {
      const cartItem: ItemData = { ...product, quantity: 1 };
      setCart([...cart, cartItem]);
    }
  };

  /** add item quantity by 1 in shopping cart */
  const onAddQuantity = (product: ItemData) => {
    const updatedQuantity = cart.map((item) => {
      if (product.id !== item.id) return item;
      return { ...item, quantity: item.quantity + 1 };
    });
    setCart(updatedQuantity);
  };

  /** reduce item quantity by 1 in shopping cart */
  const onReduceQuantity = (product: ItemData) => {
    const updatedQuantity = cart.map((item) => {
      if (product.id === item.id && item.quantity > 1)
        return { ...item, quantity: item.quantity - 1 };
      return item;
    });
    setCart(updatedQuantity);
  };

  /** remove item from from the cart */
  const removeFromCart = (product: ItemData) => {
    if (cart.find((item) => item.id === product.id)) {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
    }
  };

  /** set cart to empty array */
  const emptyCart = () => {
    setCart([]);
  };

  /** set state when a shipper is selected */
  const selectShippment = (provider: ShippingProvider) => {
    setShipper(provider);
  };

  /** set state when a payment method is selected */
  const selectPaymentMethod = (method: String) => {
    setPaymentMethod(method);
  };

  /** the below 3 function are for changing the state of the specific payment method when it is being selected,
   *  solely for the form's conditional validation */
  const selectSwish = () => {
    setIsSwish(true);
    setIsCreditCard(false);
    setIsInvoice(false);
  };

  const selectCreditCard = () => {
    setIsSwish(false);
    setIsCreditCard(true);
    setIsInvoice(false);
  };

  const selectInvoice = () => {
    setIsSwish(false);
    setIsCreditCard(false);
    setIsInvoice(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        shipper,
        paymentMethod,
        isSwish,
        isCreditCard,
        isInvoice,
        selectSwish,
        selectCreditCard,
        selectInvoice,
        addToCart,
        onAddQuantity,
        onReduceQuantity,
        removeFromCart,
        emptyCart,
        selectShippment,
        selectPaymentMethod,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);

import { createContext, FC, useContext, useState } from "react";
import { ShippingProvider } from "../ShippingProviderData";
import { ItemData, useCart } from "./CartContextProvider";

interface OrderData {
  orderNo: string;
  boughtItems: ItemData[];
  shipmentOption: ShippingProvider;
  paymentMethod: String;
  customer: Customer;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  phoneNumber: number | "";
}

interface OrderContextValue {
  order: OrderData[];
  createOrder: (customerValues: Customer) => void;
  generateOrderNum: () => string;
}

export const OrderContext = createContext<OrderContextValue>({
  order: [],
  createOrder: () => {},
  generateOrderNum: () => "",
});

const OrderProvider: FC = (props) => {
  const { cart, shipper, paymentMethod } = useCart();
  const [order, setOrder] = useState<OrderData[]>([]);

  /** push in everything related to the order to the order state */
  const createOrder = (customerValues: Customer) => {
    const boughtItems = [...cart];
    const customer: Customer = {
      name: customerValues.name,
      email: customerValues.email,
      address: customerValues.address,
      phoneNumber: customerValues.phoneNumber,
    };
    let updatedOrder: OrderData = {
      customer: customer,
      boughtItems: boughtItems,
      shipmentOption: shipper,
      paymentMethod: paymentMethod,
      orderNo: generateOrderNum(),
    };
    setOrder([updatedOrder]);
  };
  // console.log(order);

  /** generate an unique order numder */
  const generateOrderNum = () => {
    const yy: string = new Date().getFullYear().toString().substr(-2);
    const mm: number = new Date().getMonth() + 1;
    const dd: number = new Date().getDate();
    const formattedDate =
      yy + (mm > 9 ? "" : "0") + mm + (dd > 9 ? "" : "0") + dd;
    const randomNum: number = Math.floor(Math.random() * 100000);
    const orderNum: string = formattedDate + "-" + randomNum;
    return orderNum;
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        createOrder,
        generateOrderNum,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
export const useOrder = () => useContext(OrderContext);

import { createContext, FC, useContext, useEffect, useState } from "react";
import { makeRequest } from "../Helper";
import { ShippingProvider } from "../ShippingProviderData";
import { ItemData, useCart } from "./CartContextProvider";
import { toast } from "react-toastify";
interface OrderData {
  customer: string;
  email: string;
  products: ItemData[];
  paymentMethod: String;
  deliveryMethod: ShippingProvider;
  address: { street: string; city: string; zipcode: string | number };
  phoneNumber: string | number;
}

export interface Customer {
  name: string;
  email: string;
  street: string;
  zipcode: string | number;
  city: string;
  phoneNumber: number | "";
}

interface OrderContextValue {
  order: OrderData | undefined;
  createOrder: (
    customerValues: Customer,
    navigate: any,
    emptyCart: any
  ) => void;
  generateOrderNum: () => string;
  shippingProviders: ShippingProvider[];
}

export const OrderContext = createContext<OrderContextValue>({
  order: undefined,
  createOrder: () => {},
  generateOrderNum: () => "",
  shippingProviders: [],
});

const OrderProvider: FC = (props) => {
  const { cart, shipper, paymentMethod } = useCart();
  const [order, setOrder] = useState<OrderData>();
  const [shippingProviders, setShippingProviders] = useState<
    ShippingProvider[]
  >([]);
  // const [totalCost, setTotalCost] = useState<Number>()

  /** push in everything related to the order to the order state */
  const createOrder = (values: Customer, navigate: any, emptyCart: any) => {
    const boughtItems = [...cart];

    let checkoutObj: OrderData = {
      customer: values.name,
      email: values.email,
      products: boughtItems,
      paymentMethod: paymentMethod,
      deliveryMethod: shipper,
      address: {
        street: values.street,
        city: values.city,
        zipcode: values.zipcode,
      },
      phoneNumber: values.phoneNumber,
    };

    const fetchData = async () => {
      let response = await makeRequest("/api/order", "POST", checkoutObj);
      if (!response.ok) return toast.error(response.data);
      navigate("/confirmation");
      toast.success("Order Placed");
      emptyCart();
    };
    fetchData();

    // let updatedOrder: OrderData = {
    //   customer: customer,
    //   boughtItems: boughtItems,
    //   shipmentOption: shipper,
    //   paymentMethod: paymentMethod,
    //   orderNo: generateOrderNum(),
    // };
    //setTotalCost(UseSumTotal(updatedOrder.boughtItems, true))
    setOrder(checkoutObj);
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

  useEffect(() => {
    const fetchData = async () => {
      let response = await makeRequest("/api/deliveryOptions", "GET");
      setShippingProviders(response.data);
    };
    fetchData();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        order,
        createOrder,
        generateOrderNum,
        shippingProviders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
export const useOrder = () => useContext(OrderContext);

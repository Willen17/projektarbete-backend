import { ItemData, useCart } from "./context/CartContextProvider";
import { ShippingProvider } from "./ShippingProviderData";

export const sumQuantity = (itemData: ItemData[]) => {
  let sum = 0;
  for (let i = 0; i < itemData.length; i++) {
    sum += itemData[i].quantity;
  }
  return sum;
};

export const UseSumTotal = (itemData: ItemData[], includeShipping: boolean) => {
  const { shipper } = useCart();
  let sum = 0;
  for (let i = 0; i < itemData.length; i++) {
    sum += itemData[i].price * itemData[i].quantity;
  }

  if (includeShipping) {
    sum += shipper.cost;
  }
  return sum;
};

export const calculateVat = (itemData: ItemData[]) => {
  const vatRate = 0.25;
  let sum = 0;
  sum = Math.round(UseSumTotal(itemData, false) * vatRate);
  return sum;
};

export const sumProductPrice = (product: ItemData) => {
  let sum = 0;
  sum += product.price * product.quantity;
  return sum;
};

export const numWithSpaces = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const sumDeliveryCost = (
  itemData: ItemData[],
  provider: ShippingProvider
) => {
  let sum = 0;
  sum = UseSumTotal(itemData, true) + provider.cost;
  console.log(sum);
  return sum;
};

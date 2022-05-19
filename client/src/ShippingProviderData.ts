import { makeRequest } from "./Helper";

export interface ShippingProvider {
  title: string;
  cost: number;
  deliveryTime: string;
  imgURL?: string;
}

// async function getDeliveryOptions() {
//   let data = await makeRequest("/api/deliveryOptions", "GET");
//   return data;
// }

// export let shippingProvider: ShippingProvider[] = [];

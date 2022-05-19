import DhlLogo from "./assets/images/DhlLogo.png";
import PostnordLogo from "./assets/images/PostnordLogo.webp";
import pickup from "./assets/images/pickup.png"
import { makeRequest } from "./Helper";

export interface ShippingProvider {
  title: string;
  cost: number;
  deliveryTime: string;
  imgURL?: string;
}

async function getDeliveryOptions() {
  let response = await makeRequest('/api/deliveryOptions', "GET")
  let data : [] = await response.json()
  return data
}

export const shippingProvider: ShippingProvider[] = getDeliveryOptions()
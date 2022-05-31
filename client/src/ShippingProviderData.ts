import { makeRequest } from "./Helper";

export interface ShippingProvider {
  title: string;
  cost: number;
  deliveryTime: string;
  imgURL?: string;
}

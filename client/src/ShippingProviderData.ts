import DhlLogo from "./assets/images/DhlLogo.png";
import PostnordLogo from "./assets/images/PostnordLogo.webp";

export interface ShippingProvider {
  providerName: string;
  cost: number;
  deliveryTime: string;
  logoImage?: string;
}

export const shippingProvider: ShippingProvider[] = [
  {
    providerName: "Postnord",
    cost: 495,
    deliveryTime: "3-5 Weekdays",
    logoImage: PostnordLogo,
  },
  {
    providerName: "DHL",
    cost: 345,
    deliveryTime: "5-7 Weekdays",
    logoImage: DhlLogo,
  },
  {
    providerName: "Pick up at terminal",
    cost: 0,
    deliveryTime: "2-4 Weekdays",
  },
];

import { Order, User } from "./server/resources";

// Ta bort customer från order och lägg till den igen med typen User
export type ClientOrder = Omit<Order, "customer"> & {
  _id: string;
  customer: User;
};

export type ClientUser = User & { _id: string };

// export type ClientUser = User & { _id: string };
// export type ClientUser = User & { _id: string };

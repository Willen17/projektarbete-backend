import { createContext, FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../Helper";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  isAdmin: boolean;
  isApplyingForAdmin: boolean;
  email: string;
}

interface UserContextState {
  currentUser?: User;
  orders: any;
  logOutUser: (value: boolean) => void;
}

export const UserContext = createContext<UserContextState>({
  orders: [],
  logOutUser: (value: boolean) => {},
});

const UserProvider: FC = (props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [orders, setOrders] = useState<any>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // get the cookie session details from backend
    const getCookieSession = async () => {
      let response = await makeRequest("/api/user/login", "GET");
      if (!response.ok) return;
      setCurrentUser(response.data.user);
    };
    getCookieSession();
  }, [location]);

  useEffect(() => {
    const getOrder = async () => {
      let response = await makeRequest(`/api/order/${currentUser?._id}`, "GET");
      if (!response.ok) return;
      // console.log(response.data)
      setOrders(response.data);
    };
    getOrder();
  }, [currentUser]);

  const logOutUser = (value: boolean) => {
    setCurrentUser(undefined);
    navigate("/");
    toast.success("You successfully logged out");
    // window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        orders,
        logOutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);

import { createContext, FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
      try {
        let result = await makeRequest("/api/user/login", "GET");
        if (result.ok) {
          console.log(result);
          setCurrentUser(result.data.user);
        }
      } catch (error) {
        return console.log("not logged in");
      }
    };
    getCookieSession();
  }, [location]);

  useEffect(() => {
    const getOrder = async () => {
      let response = await makeRequest(`/api/order/${currentUser?._id}`, "GET");
      if (response.ok) {
        console.log(response);
        setOrders(response.data);
        return;
      } else {
        console.log("not logged in");
      }
    };
    getOrder();
  }, [currentUser?._id, location]);

  const logOutUser = (value: boolean) => {
    setCurrentUser(undefined);
    navigate("/");
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

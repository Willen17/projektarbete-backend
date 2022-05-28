import { createContext, FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../Helper";

// interface User {
//     _id: string;
//     name: string;
//     isAdmin: boolean;
// }

interface UserContextState {
    isLoggedIn: boolean;
    currentUser: any;
    orders: any;
    logOutUser: (value: boolean) => void;
}

export const UserContext = createContext<UserContextState>({
    isLoggedIn: false,
    currentUser: {},
    orders: [],
    logOutUser: (value: boolean) => {},
  });

const UserProvider: FC = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<any>({});
    const [orders, setOrders] = useState<any>([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // get the cookie session details from backend
      const getCookieSession = async () => {
        try {
          let result = await makeRequest("/api/user/login", "GET");
          if(result.ok) {
            console.log(result);
            setCurrentUser(result);
            setIsLoggedIn(true);
          }
        } catch (error) {
          return console.log('not logged in');
        }
      };
      getCookieSession();
    }, [location]);

    useEffect(() => {
        const getOrder = async () => {
          let response = await makeRequest(`/api/order/${currentUser.data.user._id}`, "GET");
          if(response.ok) {
            console.log(response);
            setOrders(response.data);
            return;
          } else {
              console.log('not logged in')
          }
        }
        getOrder();
      }, [location])

    const logOutUser = (value: boolean) => {
        setIsLoggedIn(value);
        navigate('/');
    }

    return  <UserContext.Provider 
        value={{
            isLoggedIn,
            currentUser,
            orders,
            logOutUser,
        }}
    >
        {props.children}
    </UserContext.Provider>
}

export default UserProvider;
export const useUser = () => useContext(UserContext);
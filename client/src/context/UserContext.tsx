import { createContext, FC, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../Helper";

// interface User {
//     _id: string;
//     name: string;
//     isAdmin: boolean;
// }

interface UserContextState {
    isLoggedIn: boolean;
    currentUser: object;
}

export const UserContext = createContext<UserContextState>({
    isLoggedIn: false,
    currentUser: {},
  });

const UserProvider: FC = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<object>({});
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
          return;
        }
      };
      getCookieSession();
    }, [location]);


    return  <UserContext.Provider 
        value={{
            isLoggedIn,
            currentUser,
        }}
    >
        {props.children}
    </UserContext.Provider>
}

export default UserProvider;
export const useUser = () => useContext(UserContext);
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../Helper";

interface UserContextState {
    isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextState>({
    isLoggedIn: false,
  });

const UserProvider: FC = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
      // get the cookie session details from backend
      const getCookieSession = async () => {
        try {
          let result = await makeRequest("/api/user/login", "GET");
          if(result.ok) {
            console.log(result)
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
        }}
    >
        {props.children}
    </UserContext.Provider>
}

export default UserProvider;
export const useUser = () => useContext(UserContext);
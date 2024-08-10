import { createContext, ReactNode, useState } from "react";

import useLocalStorage from "@/hooks/use-local-storage";

interface UserData {
  token: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  logout: () => void;
  updateTrigger: number;
  refresh: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  updateTrigger: 0,
  refresh: () => {},
  setUserData: () => {
    console.warn("setUserData called outside of UserProvider");
  },
  logout: () => {
    console.warn("logout called outside of UserProvider");
  },
});
export default UserContext;

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useLocalStorage<UserData | null>(
    "userData",
    null,
  );
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const logout = () => {
    setUserData(null);
  };

  const refreshProducts = () => setUpdateTrigger((prev) => prev + 1);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        logout,
        updateTrigger,
        refresh: refreshProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

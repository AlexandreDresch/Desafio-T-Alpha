import { createContext, ReactNode } from "react";

import useLocalStorage from "@/hooks/use-local-storage";

interface UserData {
  token: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
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

  const logout = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}

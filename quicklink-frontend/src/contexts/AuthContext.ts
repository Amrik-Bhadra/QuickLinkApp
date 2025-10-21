import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  userAuthentication: (token: string) => void;
  logout: () => void;
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);
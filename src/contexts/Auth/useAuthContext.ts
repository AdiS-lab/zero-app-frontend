import { useContext, createContext } from "react";

export interface IProfile {
  userId: string;
  email: string;
  avatar: string;
}

export interface IAuthContext {
  profile: IProfile | null;
  login: (data: IProfile) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error();
  return ctx;
};

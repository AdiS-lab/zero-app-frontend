import { useState } from "react";
import { AuthContext, type IProfile } from "./useAuthContext";

const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  const login = (data: IProfile) => {
    setProfile(data);
  };

  const logout = () => {
    setProfile(null);
  };
  return (
    <AuthContext.Provider
      value={{
        profile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

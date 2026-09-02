import { useEffect, useState } from "react";
import { AuthContext, type IProfile } from "./useAuthContext";
import api from "../../api/axios";

const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    async function updateProfile() {
      const res = await api.get("/api/v1/auth/me");
      if (!res) return;
      setProfile({ userId: res.data.user._id, email: res.data.user.email });
    }
    updateProfile();
  }, []);

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

import { useEffect, useState } from "react";
import { AuthContext, type IProfile } from "./useAuthContext";
import api from "../../api/axios";
import buildImage from "../../helpers/build-image";

const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    async function updateProfile() {
      try {
        const res = await api.get("/api/v1/auth/me");
        if (!res) return;
        
        const avatar = buildImage(
          res.data.user.avatar.buffer.data,
          res.data.user.avatar.mimetype,
        );

        setProfile({
          userId: res.data.user._id,
          email: res.data.user.email,
          avatar,
        });
      } catch (e) {
        console.log("error with retrieving profile: ", e);
      }
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

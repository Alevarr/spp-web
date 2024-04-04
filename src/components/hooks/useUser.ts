import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import useCookieValue from "./useCookieValue";
import { User } from "../../tyeps";

const useUser = () => {
  const token = useCookieValue("token");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = () => {
      if (!token || token == "undefined") {
        setUser(null);
        return;
      }
      const decodedToken: User = jwtDecode(token);
      setUser({
        sub: decodedToken.sub,
        roles: decodedToken.roles,
      });
    };

    getUser();
  }, [token]);

  return user;
};

export default useUser;

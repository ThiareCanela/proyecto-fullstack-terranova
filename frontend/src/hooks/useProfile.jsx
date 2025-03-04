import { useEffect, useState } from "react";

const useProfile = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    avatar: "https://via.placeholder.com/150",
  });

  const handleRegister = (userData) => {
    localStorage.setItem("userProfile", JSON.stringify(userData));
  };

  const handleLogin = (email, password) => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        return true;
      }
    }
    return false;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && isLoggedIn === "true") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return {
    user,
    handleRegister,
    handleLogin,
  };
};

export default useProfile;

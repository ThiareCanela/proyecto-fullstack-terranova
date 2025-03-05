import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (newUser) => {
    let users = JSON.parse(localStorage.getItem("users"));

    if (!Array.isArray(users)) {
      users = [];
    }

    newUser.email = newUser.email.trim().toLowerCase();

    const userExists = users.some((u) => u.email === newUser.email);

    if (userExists) {
      setMessageError("El correo ya está registrado.");
      return false;
    }

    if (!newUser.name || !newUser.lastName || !newUser.password) {
      setMessageError("Por favor completa todos los campos.");
      return false;
    }

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    setUser(newUser);
    alert("Registro exitoso");

    return true;
  };

  const login = (enteredEmail, enteredPassword) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const normalizedEmail = enteredEmail.trim().toLowerCase();

    const foundUser = users.find((user) => user.email === normalizedEmail);

    if (!foundUser) {
      setMessageError("Usuario no encontrado");
      return false;
    }

    if (foundUser.password !== enteredPassword) {
      setMessageError("Contraseña incorrecta");
      return false;
    }

    // Asegurar que los datos completos se guardan en `setUser`
    setUser({
      name: foundUser.name,
      lastName: foundUser.lastName,
      email: foundUser.email,
      role: foundUser.role,
      profilePicture: foundUser.profilePicture,
    });

    localStorage.setItem("loggedUser", JSON.stringify(foundUser));

    return true;
  };
  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminEmail = "terranova.admin@gmail.com";

    const adminExists = users.some(
      (user) => user.email.trim().toLowerCase() === adminEmail
    );

    if (!adminExists) {
      const adminUser = {
        name: "Admin",
        lastName: "Terranova",
        email: adminEmail,
        password: "admin123",
        role: "admin",
        profilePicture: "src/assets/profile.webp",
      };
      localStorage.setItem("users", JSON.stringify([...users, adminUser]));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        messageError,
        user,
        setMessageError,

        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

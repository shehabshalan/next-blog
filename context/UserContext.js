import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Endpoints } from "../Constants/endpoints";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (item && user) {
      setIsAuth(true);
      setUser(user);
    }
  }, []);
  function login(payload) {
    setLoading(true);
    const url = Endpoints.login;
    return axios
      .post(url, payload)
      .then((response) => {
        setLoading(false);
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/";
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error.response);
      });
  }
  function register(payload) {
    setLoading(true);
    const url = Endpoints.register;
    return axios
      .post(url, payload)
      .then((response) => {
        setLoading(false);
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/";
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error.response);
      });
  }
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  }

  return (
    <UserContext.Provider
      value={{
        isAuth,
        user,
        loading,
        register,
        login,
        logout,
        searchTerm,
        setSearchTerm,
        open,
        setOpen,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

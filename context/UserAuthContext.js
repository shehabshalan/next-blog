import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Endpoints } from "../Constants/endpoints";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
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
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
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
    router("/login");
  }

  return (
    <userAuthContext.Provider
      value={{ isAuth, user, loading, register, login, logout }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

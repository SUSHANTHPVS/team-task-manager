import {
  createContext,
  useContext,
  useState,
} from "react";

import API from "../services/api";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    localStorage.getItem("token") || null
  );


  // LOGIN
  const login = async (email, password) => {

    const { data } = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.token);
  };


  // SIGNUP
  const signup = async (
    name,
    email,
    password
  ) => {

    const { data } = await API.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.token);
  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

    window.location.href = "/";
  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () =>
  useContext(AuthContext);
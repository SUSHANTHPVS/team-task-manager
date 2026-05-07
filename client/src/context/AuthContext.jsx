import {
  createContext,
  useContext,
  useState,
} from "react";

import API from "../services/api";

const AuthContext =
  createContext();


// PROVIDER
export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(

      localStorage.getItem(
        "token"
      ) || null
    );


  // USER LOGIN
  const login = async (
    email,
    password
  ) => {

    const { data } =
      await API.post(

        "/auth/login",

        {
          email,
          password,
        }
      );

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      data.token
    );

    // SAVE ROLE
    localStorage.setItem(
      "role",
      data.role || "member"
    );

    setUser(data);
  };


  // ADMIN LOGIN
  const adminLogin = async (
    email,
    password
  ) => {

    const { data } =
      await API.post(

        "/auth/login",

        {
          email,
          password,
        }
      );

    // CHECK ADMIN
    if (
      data.role !== "admin"
    ) {

      throw new Error(
        "Not an admin account"
      );
    }

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      data.token
    );

    // SAVE ROLE
    localStorage.setItem(
      "role",
      data.role
    );

    setUser(data);
  };


  // SIGNUP
  const signup = async (

    name,
    email,
    password,
    role = "member"

  ) => {

    const { data } =
      await API.post(

        "/auth/register",

        {
          name,
          email,
          password,
          role,
        }
      );

    return data;
  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    setUser(null);

    window.location.href = "/";
  };


  return (

    <AuthContext.Provider

      value={{

        user,

        login,

        adminLogin,

        signup,

        logout,

      }}
    >

      {children}

    </AuthContext.Provider>
  );
};


// USE AUTH
export const useAuth = () =>

  useContext(AuthContext);
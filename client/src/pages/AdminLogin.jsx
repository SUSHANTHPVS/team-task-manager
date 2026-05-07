import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      if (data.role !== "admin") {

        return alert(
          "Not an admin account"
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">

          Admin Login

        </h1>


        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded-lg"
        >
          Admin Login
        </button>
        <p className="text-center mt-4 text-gray-600">

  Not registered?{" "}

  <Link
    to="/admin/signup"
    className="text-blue-600 font-bold hover:underline"
  >

    Sign Up

  </Link>

</p>

      </form>

    </div>
  );
};

export default AdminLogin;
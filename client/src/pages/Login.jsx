import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import API from "../services/api";

const Login = () => {

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

      // STORE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // STORE ROLE
      localStorage.setItem(
        "role",
        data.role
      );


      // ADMIN
      if (data.role === "admin") {

        navigate(
          "/admin/dashboard"
        );
      }

      // MEMBER
      else {

        navigate("/dashboard");
      }

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "Login Failed"

      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">

          User Login

        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

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
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>


        <p className="text-center mt-4 text-gray-600">

          Not registered?{" "}

          <Link
            to="/signup"
            className="text-blue-600 font-bold hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;
import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

const AdminLogin = () => {

  const navigate =
    useNavigate();

  const { adminLogin } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await adminLogin(
          email,
          password
        );

        navigate(
          "/admin/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Admin Login Failed"
        );
      }
    };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-black">

          Admin Login

        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Admin Email"

            className="w-full border p-3 rounded-lg text-black"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />


          <input
            type="password"
            placeholder="Password"

            className="w-full border p-3 rounded-lg text-black"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />


          <button
            type="submit"

            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >

            Admin Login

          </button>

        </form>


        <p className="text-center mt-4 text-gray-600">

          Not registered?{" "}

          <Link
            to="/admin/signup"

            className="text-blue-600 font-bold hover:underline"
          >

            Sign Up

          </Link>

        </p>

      </div>

    </div>
  );
};

export default AdminLogin;
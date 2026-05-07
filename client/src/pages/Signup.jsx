import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import API from "../services/api";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await API.post(
          "/auth/register",
          {
            name,
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

      // REDIRECT USER
      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Signup Failed"

      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">

          User Signup

        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }
          />


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
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Signup
          </button>

        </form>


        <p className="text-center mt-4 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Signup;
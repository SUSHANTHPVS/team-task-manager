import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { Link } from "react-router-dom";
const AdminSignup = () => {

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

      await API.post(
        "/auth/register",
        {

          name,
          email,
          password,

          role: "admin",

        }
      );

      alert(
        "Admin Registered Successfully"
      );

      navigate("/admin/login");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">

          Admin Signup

        </h1>


        <input
          type="text"
          placeholder="Name"
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
          className="w-full bg-red-600 text-white p-3 rounded-lg"
        >
          Admin Signup
        </button>
        <p className="text-center mt-4 text-gray-600">

  Already have an account?{" "}

  <Link
    to="/admin/login"
    className="text-blue-600 font-bold hover:underline"
  >

    Login

  </Link>

</p>

      </form>

    </div>
  );
};

export default AdminSignup;
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import AdminLogin from "./pages/AdminLogin";

import AdminSignup from "./pages/AdminSignup";

import AdminDashboard from "./pages/AdminDashboard";

import MemberDashboard from "./pages/MemberDashboard";

import Projects from "./pages/Projects";

function App() {

  return (

    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* USER */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={<MemberDashboard />}
      />


      {/* ADMIN */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/signup"
        element={<AdminSignup />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />


      {/* PROJECTS */}

      <Route
        path="/projects"
        element={<Projects />}
      />

    </Routes>
  );
}

export default App;
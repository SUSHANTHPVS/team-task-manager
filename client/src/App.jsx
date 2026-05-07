import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";

import AdminSignup from "./pages/AdminSignup";

import AdminDashboard
from "./pages/AdminDashboard";

import MemberDashboard
from "./pages/MemberDashboard";
import AdminProjects
from "./pages/AdminProjects";



function App() {

  return (

    <BrowserRouter>

      <Routes>

  <Route
  path="/"
  element={<Home />}
/>
<Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/signup"
    element={<Signup />}
  />

 
  <Route
    path="/projects"
    element={
      <ProtectedRoute>
        <Projects />
      </ProtectedRoute>
    }
  />

  <Route
    path="/tasks"
    element={
      <ProtectedRoute>
        <Tasks />
      </ProtectedRoute>
    }
  />
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
<Route
  path="/dashboard"
  element={<MemberDashboard />}
/>

</Routes>

    </BrowserRouter>
  );
}

export default App;
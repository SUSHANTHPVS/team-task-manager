import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";

import AdminSignup from "./pages/AdminSignup";

import AdminDashboard from "./pages/AdminDashboard";



function App() {

  return (

    <BrowserRouter>

      <Routes>

  <Route
  path="/"
  element={<Home />}
/>

  <Route
    path="/signup"
    element={<Signup />}
  />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
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

</Routes>

    </BrowserRouter>
  );
}

export default App;
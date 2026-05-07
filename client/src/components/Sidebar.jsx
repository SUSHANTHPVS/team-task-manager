import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

import { useTheme }
from "../context/ThemeContext";

const Sidebar = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem("role");

  const { logout } =
    useAuth();

  const {
    darkMode,
    toggleTheme,
  } = useTheme();


  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate("/");
  };


  // ADMIN LINKS
  const adminLinks = [

    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
    },

    {
      name: "Projects",
      path: "/projects",
    },

  ];


  // MEMBER LINKS
  const memberLinks = [

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Projects",
      path: "/projects",
    },

  ];


  const links =
    role === "admin"
      ? adminLinks
      : memberLinks;


  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">

    TM

  </div>

  <h1 className="text-3xl font-bold text-blue-400">

    TaskManager

  </h1>


      {/* THEME */}

      <button

        onClick={toggleTheme}

        className="mt-10 w-full bg-gray-700 py-3 rounded-lg hover:bg-gray-600"
      >

        {
          darkMode
            ? "Light Mode"
            : "Dark Mode"
        }

      </button>


      {/* LOGOUT */}

      <button

        onClick={handleLogout}

        className="mt-6 w-full bg-red-500 py-3 rounded-lg hover:bg-red-600"
      >

        Logout

      </button>

    </div>
  );
};

export default Sidebar;
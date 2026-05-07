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


  // HANDLE LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

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
      path: "/admin/projects",
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

    {
      name: "Tasks",
      path: "/tasks",
    },

  ];


  const links =
    role === "admin"
      ? adminLinks
      : memberLinks;


  return (

    <div className="w-64 bg-gray-900 dark:bg-black text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10 text-blue-400">

        Task Manager

      </h1>


      {/* NAVIGATION */}

      <div className="space-y-4">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}

            className={`block px-4 py-3 rounded-lg transition ${
              location.pathname ===
              link.path

                ? "bg-blue-600"

                : "hover:bg-gray-800"
            }`}
          >

            {link.name}

          </Link>
        ))}

      </div>


      {/* THEME BUTTON */}

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


      {/* LOGOUT BUTTON */}

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
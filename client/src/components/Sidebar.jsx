import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";


const Sidebar = () => {

  const location = useLocation();

  const { logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();


  const links = [
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


  return (

    <div className="w-64 bg-gray-900 dark:bg-black text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10 text-blue-400">
        Task Manager
      </h1>


      <div className="space-y-4">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 rounded-lg transition ${
              location.pathname === link.path
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`}
          >
            {link.name}
          </Link>

        ))}

      </div>
      <button
  onClick={toggleTheme}
  className="mt-10 w-full bg-gray-700 py-3 rounded-lg hover:bg-gray-600"
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>


      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 py-3 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
import {
  Link,
} from "react-router-dom";

const Home = () => {

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-10">

      <h1 className="text-6xl font-bold text-blue-600 mb-4">

        TaskManager

      </h1>


      <p className="text-xl text-gray-700 mb-12 text-center">

        Team Collaboration & Project Management Platform

      </p>


      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">

        {/* USER PORTAL */}

        <div className="bg-white p-10 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-4 text-black">

            User Portal

          </h2>

          <p className="text-gray-600 mb-6">

            Manage assigned tasks,
            projects, and work progress.

          </p>


          <div className="flex gap-4">

            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >

              User Login

            </Link>


            <Link
              to="/signup"
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >

              User Signup

            </Link>

          </div>

        </div>


        {/* ADMIN PORTAL */}

        <div className="bg-white p-10 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-4 text-black">

            Admin Portal

          </h2>

          <p className="text-gray-600 mb-6">

            Manage teams, projects,
            tasks, and analytics.

          </p>


          <div className="flex gap-4">

            <Link
              to="/admin/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >

              Admin Login

            </Link>


            <Link
              to="/admin/signup"
              className="bg-red-600 text-white px-6 py-3 rounded-xl"
            >

              Admin Signup

            </Link>

          </div>

        </div>

      </div>


      <footer className="mt-20 text-gray-500 text-center">

        © 2026 TaskManager.
        All rights reserved.

      </footer>

    </div>
  );
};

export default Home;
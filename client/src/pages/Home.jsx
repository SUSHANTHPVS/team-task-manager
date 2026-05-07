import { Link } from "react-router-dom";

const Home = () => {

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">


        {/* USER PORTAL */}
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

          <h1 className="text-4xl font-bold mb-4 text-blue-600">
            
                 TaskFlow
          </h1>

          <p className="text-gray-600 mb-8">
            Smart Team Collaboration &
            Project Management Platform
          </p>


          <div className="space-y-4">

            <Link
              to="/login"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              User Login
            </Link>


            <Link
              to="/signup"
              className="block w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold"
            >
              User Signup
            </Link>

          </div>

        </div>


        {/* ADMIN PORTAL */}
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

          <h1 className="text-4xl font-bold mb-4 text-red-600">
            Admin Portal
          </h1>

          <p className="text-gray-600 mb-8">
            Manage teams, projects, tasks,
            users, and monitor overall progress.
          </p>
<div className="space-y-4">

            <Link
              to="/admin/login"
              className="block w-full bg-red-600 text-white py-3 rounded-xl font-semibold"
            >
              Admin Login
            </Link>


            <Link
              to="/admin/signup"
              className="block w-full border border-red-600 text-red-600 py-3 rounded-xl font-semibold"
            >
              Admin Signup
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
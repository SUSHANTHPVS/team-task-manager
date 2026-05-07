import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({});

  const fetchStats = async () => {

    try {

      const { data } =
        await API.get(
          "/dashboard/stats"
        );

      setStats(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchStats();

  }, []);

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">

          Admin Dashboard

        </h1>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold">
              Total Tasks
            </h2>

            <p className="text-3xl mt-4">
              {stats.totalTasks || 0}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold">
              Completed
            </h2>

            <p className="text-3xl mt-4">
              {stats.completed || 0}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold">
              In Progress
            </h2>

            <p className="text-3xl mt-4">
              {stats.inProgress || 0}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold">
              Overdue
            </h2>

            <p className="text-3xl mt-4">
              {stats.overdue || 0}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
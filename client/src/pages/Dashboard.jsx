import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";


const Dashboard = () => {

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const { data } = await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchProjects();

    fetchTasks();

  }, []);


  // STATUS COUNTS
  const todoTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;


  // PIE DATA
  const pieData = [
    {
      name: "To Do",
      value: todoTasks,
    },
    {
      name: "In Progress",
      value: progressTasks,
    },
    {
      name: "Done",
      value: doneTasks,
    },
  ];


  // BAR DATA
  const barData = [
    {
      name: "Projects",
      count: projects.length,
    },
    {
      name: "Tasks",
      count: tasks.length,
    },
    {
      name: "Completed",
      count: doneTasks,
    },
  ];


  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#10B981",
    "dark:text-white"
  ];


  return (

    <div className="flex">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

        <h1 className="text-4xl font-bold mb-8 dark:text-white">
          Dashboard Analytics
        </h1>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold dark:text-white">
              Total Projects
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-4">
              {projects.length}
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold dark:text-white">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-4">
              {tasks.length}
            </p>

          </div>


          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold dark:text-white">
              Completed Tasks
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-4">
              {doneTasks}
            </p>

          </div>

        </div>


        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Task Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>


          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Overall Statistics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={barData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#3B82F6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
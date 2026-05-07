import { useEffect, useState } from "react";

import API from "../services/api";

const MemberDashboard = () => {

  const [tasks, setTasks] =
    useState([]);

  const fetchTasks = async () => {

    try {

      const { data } =
        await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  const completed =
    tasks.filter(
      (task) =>
        task.status === "Done"
    ).length;

  const pending =
    tasks.filter(
      (task) =>
        task.status !== "Done"
    ).length;

  const overdue =
    tasks.filter(

      (task) =>

        new Date(task.dueDate)
        < new Date()

        &&

        task.status !== "Done"

    ).length;

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-8">

        Member Dashboard

      </h1>


      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Assigned Tasks
          </h2>

          <p className="text-3xl mt-4">
            {tasks.length}
          </p>

        </div>


        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Completed
          </h2>

          <p className="text-3xl mt-4">
            {completed}
          </p>

        </div>


        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Overdue
          </h2>

          <p className="text-3xl mt-4">
            {overdue}
          </p>

        </div>

      </div>


      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">

          My Tasks

        </h2>


        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h3 className="text-xl font-bold">
                {task.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>

              <div className="flex gap-4 mt-4">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">

                  {task.priority}

                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">

                  {task.status}

                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default MemberDashboard;
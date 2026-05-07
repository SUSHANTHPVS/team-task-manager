import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

const MemberDashboard = () => {

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const { data } =
        await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const { data } =
        await API.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);


  // STATS
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

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN CONTENT */}

      <div className="flex-1 min-h-screen bg-gray-100 p-6">

        <h1 className="text-4xl font-bold mb-8 text-black">

          Member Dashboard

        </h1>


        {/* STATISTICS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold text-black">

              Assigned Tasks

            </h2>

            <p className="text-3xl mt-4 text-blue-600">

              {tasks.length}

            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold text-black">

              Completed

            </h2>

            <p className="text-3xl mt-4 text-green-600">

              {completed}

            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold text-black">

              Overdue

            </h2>

            <p className="text-3xl mt-4 text-red-600">

              {overdue}

            </p>

          </div>

        </div>


        {/* TASKS */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6 text-black">

            My Tasks

          </h2>


          <div className="space-y-4">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-5 rounded-xl shadow"
              >

                <h3 className="text-2xl font-bold text-black">

                  {task.title}

                </h3>


                <p className="text-gray-700 mt-2">

                  {task.description}

                </p>


                <div className="flex gap-4 mt-4 flex-wrap">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">

                    {task.priority}

                  </span>


                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">

                    {task.status}

                  </span>


                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">

                    {task.project?.name}

                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>


        {/* TEAMS */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6 text-black">

            My Teams

          </h2>


          <div className="space-y-6">

            {projects.map((project) => (

              <div
                key={project._id}
                className="bg-white p-6 rounded-xl shadow"
              >

                <h3 className="text-2xl font-bold text-black">

                  {project.name}

                </h3>


                <p className="text-gray-700 mt-2">

                  {project.description}

                </p>


                {/* MEMBERS */}

                <div className="mt-5">

                  <h4 className="font-bold mb-3 text-black">

                    Team Members

                  </h4>


                  {

                    project.members &&
                    project.members.length > 0

                      ? (

                          project.members.map(
                            (member) => (

                              <div
                                key={member._id}
                                className="bg-gray-100 p-2 rounded mb-2 text-black"
                              >

                                {member.name}

                                {" - "}

                                {member.email}

                              </div>
                            )
                          )
                        )

                      : (

                          <p className="text-gray-500">

                            No team members

                          </p>
                        )
                  }

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default MemberDashboard;
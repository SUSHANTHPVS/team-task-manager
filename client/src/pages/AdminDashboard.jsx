import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {

  // STATES
  const [stats, setStats] =
    useState({});

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [project, setProject] =
    useState("");


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


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const { data } =
        await API.get("/auth/users");

      setUsers(data);

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


  // FETCH STATS
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


  // CREATE TASK
  const createTask = async (
    e
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/tasks",
        {
          title,
          description,
          priority,
          dueDate,
          assignedTo,
          project,
        }
      );

      alert(
        "Task Assigned Successfully"
      );

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setAssignedTo("");
      setProject("");

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // DELETE TASK
  const deleteTask = async (
    id
  ) => {

    try {

      await API.delete(
        `/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // EDIT TASK
  const editTask = async (
    task
  ) => {

    const updatedTitle =
      prompt(
        "Edit Title",
        task.title
      );

    if (!updatedTitle) return;

    try {

      await API.put(

        `/tasks/edit/${task._id}`,

        {
          title: updatedTitle,
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // USE EFFECT
  useEffect(() => {

    fetchStats();

    fetchTasks();

    fetchUsers();

    fetchProjects();

  }, []);


  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8 text-black">

          Admin Dashboard

        </h1>


        {/* STATS */}

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


        {/* ASSIGN TASK FORM */}

        <form
          onSubmit={createTask}
          className="bg-white p-6 rounded-xl shadow mt-10 space-y-4"
        >

          <h2 className="text-2xl font-bold">

            Assign Task

          </h2>


          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-3 rounded-lg"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />


          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          ></textarea>


          <select
            className="w-full border p-3 rounded-lg"
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
          >

            <option>
              Low
            </option>

            <option>
              Medium
            </option>

            <option>
              High
            </option>

          </select>


          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />


          {/* USERS */}

          <select
            className="w-full border p-3 rounded-lg"
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(
                e.target.value
              )
            }
          >

            <option value="">
              Select Team Member
            </option>

            {

              users.map((user) => (

                <option
                  key={user._id}
                  value={user._id}
                >

                  {user.name}
                  {" - "}
                  {user.email}

                </option>
              ))
            }

          </select>


          {/* PROJECTS */}

          <select
            className="w-full border p-3 rounded-lg"
            value={project}
            onChange={(e) =>
              setProject(
                e.target.value
              )
            }
          >

            <option value="">
              Select Project
            </option>

            {

              projects.map((project) => (

                <option
                  key={project._id}
                  value={project._id}
                >

                  {project.name}

                </option>
              ))
            }

          </select>


          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >

            Assign Task

          </button>

        </form>


        {/* TASKS */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">

            All Tasks

          </h2>


          <div className="space-y-4">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-5 rounded-xl shadow"
              >

                <h3 className="text-2xl font-bold">

                  {task.title}

                </h3>


                <p className="text-gray-700 mt-2">

                  {task.description}

                </p>


                <div className="flex gap-3 mt-4 flex-wrap">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">

                    {task.priority}

                  </span>


                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">

                    {task.status}

                  </span>

                </div>


                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      editTask(task)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >

                    Edit

                  </button>


                  <button
                    onClick={() =>
                      deleteTask(
                        task._id
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >

                    Delete

                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
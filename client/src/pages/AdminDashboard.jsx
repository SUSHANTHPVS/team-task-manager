import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";
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

const [users, setUsers] =
  useState([]);

const [projects, setProjects] =
  useState([]);

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({});
    
    const deleteTask = async (id) => {

  try {

    await API.delete(
      `/tasks/${id}`
    );

    fetchTasks();

  } catch (error) {

    console.log(error);
  }
};
<form
  onSubmit={createTask}

  className="bg-white p-6 rounded-xl shadow mb-10 space-y-4"
>

  <h2 className="text-2xl font-bold text-black">

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


  {/* PRIORITY */}

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


  {/* DUE DATE */}

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


  {/* SELECT USER */}

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


  {/* SELECT PROJECT */}

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

    fetchTasks();

  } catch (error) {

    console.log(error);
  }
};
const fetchProjects = async () => {

  try {

    const { data } =
      await API.get(
        "/projects"
      );

    setProjects(data);

  } catch (error) {

    console.log(error);
  }
};
const fetchUsers = async () => {

  try {

    const { data } =
      await API.get(
        "/auth/users"
      );

    setUsers(data);

  } catch (error) {

    console.log(error);
  }
};
const editTask = async (task) => {

  const title =
    prompt(
      "Edit Title",
      task.title
    );

  if (!title) return;

  try {

    await API.put(

      `/tasks/edit/${task._id}`,

      {
        title,
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);
  }
};

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

    fetchTasks();

    fetchUsers();

    fetchProjects();

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
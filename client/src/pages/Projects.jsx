import { useEffect, useState } from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Projects = () => {

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  // CREATE PROJECT
  const createProject = async (e) => {

    e.preventDefault();

    try {

      await API.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchProjects();

  }, []);


  return (

    <div className="flex">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 p-6">

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          Projects
        </h1>


        {/* Create Project Form */}
        <form
          onSubmit={createProject}
          className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
        >

          <input
            type="text"
            placeholder="Project Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <textarea
            placeholder="Project Description"
            className="w-full border p-3 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>


          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Create Project
          </button>

        </form>


        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <h2 className="text-2xl font-bold dark:text-white">
                {project.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-3">
                {project.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Projects;
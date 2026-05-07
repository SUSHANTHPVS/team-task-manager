import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

const Projects = () => {

  const role =
    localStorage.getItem("role");

  const [projects, setProjects] =
    useState([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [userId, setUserId] =
    useState("");


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


  // CREATE PROJECT
  const createProject = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/projects",
        {
          name,
          description,
        }
      );

      setName("");
      setDescription("");

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };


  // DELETE PROJECT
  const deleteProject = async (id) => {

    try {

      await API.delete(
        `/projects/${id}`
      );

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };


  // EDIT PROJECT
  const editProject = async (
    project
  ) => {

    const updatedName =
      prompt(
        "Edit Project Name",
        project.name
      );

    if (!updatedName) return;

    try {

      await API.put(

        `/projects/${project._id}`,

        {
          name: updatedName,
        }
      );

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };


  // ADD MEMBER
  const addMember = async (
    projectId
  ) => {

    try {

      await API.put(

        `/projects/${projectId}/members`,

        {
          userId,
        }
      );

      setUserId("");

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

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN CONTENT */}

      <div className="flex-1 min-h-screen bg-gray-100 p-6">

        <h1 className="text-4xl font-bold mb-8">

          Projects

        </h1>


        {/* ADMIN CREATE PROJECT */}

        {
          role === "admin" && (

            <form
              onSubmit={createProject}
              className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
            >

              <h2 className="text-2xl font-bold">

                Create Project

              </h2>


              <input
                type="text"
                placeholder="Project Name"

                className="w-full border p-3 rounded-lg"

                value={name}

                onChange={(e) =>
                  setName(e.target.value)
                }
              />


              <textarea
                placeholder="Project Description"

                className="w-full border p-3 rounded-lg"

                value={description}

                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              ></textarea>


              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >

                Create Project

              </button>

            </form>
          )
        }


        {/* PROJECT CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <h2 className="text-2xl font-bold">

                {project.name}

              </h2>


              <p className="text-gray-600 mt-3">

                {project.description}

              </p>


              {/* TEAM MEMBERS */}

              <div className="mt-5">

                <h3 className="font-bold mb-3">

                  Team Members

                </h3>


                {
                  project.members?.map(
                    (member) => (

                      <div
                        key={member._id}
                        className="bg-gray-100 p-2 rounded mb-2"
                      >

                        {member.name}

                        {" - "}

                        {member.email}

                      </div>
                    )
                  )
                }

              </div>


              {/* ADMIN ACTIONS */}

              {
                role === "admin" && (

                  <>

                    {/* ADD MEMBER */}

                    <div className="mt-5 flex gap-3">

                      <input
                        type="text"
                        placeholder="Enter User ID"

                        className="border p-2 rounded-lg flex-1"

                        value={userId}

                        onChange={(e) =>
                          setUserId(
                            e.target.value
                          )
                        }
                      />


                      <button

                        onClick={() =>
                          addMember(
                            project._id
                          )
                        }

                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >

                        Add

                      </button>

                    </div>


                    {/* EDIT DELETE */}

                    <div className="flex gap-3 mt-5">

                      <button

                        onClick={() =>
                          editProject(project)
                        }

                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >

                        Edit

                      </button>


                      <button

                        onClick={() =>
                          deleteProject(
                            project._id
                          )
                        }

                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >

                        Delete

                      </button>

                    </div>

                  </>
                )
              }

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Projects;
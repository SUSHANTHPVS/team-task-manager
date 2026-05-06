import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";


const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");

  const [dueDate, setDueDate] = useState("");

  const [project, setProject] = useState("");


  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const { data } = await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  // CREATE TASK
  const createTask = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
        project,
      });

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setProject("");

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // DRAG & DROP
  const handleDragEnd = async (result) => {

    if (!result.destination) return;

    const taskId = result.draggableId;

    const newStatus = result.destination.droppableId;

    try {

      await API.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);


  const columns = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "In Progress": tasks.filter(
      (t) => t.status === "In Progress"
    ),
    Done: tasks.filter((t) => t.status === "Done"),
  };


  return (

    <div className="flex">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 p-6">

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          Task Board
        </h1>


        {/* Create Task Form */}
        <form
          onSubmit={createTask}
          className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
        >

          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-3 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />


          <textarea
            placeholder="Task Description"
            className="w-full border p-3 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>


          <select
            className="w-full border p-3 rounded-lg"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>


          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />


          <select
            className="w-full border p-3 rounded-lg"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >

            <option value="">
              Select Project
            </option>

            {projects.map((proj) => (

              <option
                key={proj._id}
                value={proj._id}
              >
                {proj.name}
              </option>

            ))}

          </select>


          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Create Task
          </button>

        </form>


        {/* KANBAN BOARD */}
        <DragDropContext onDragEnd={handleDragEnd}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {Object.entries(columns).map(
              ([columnId, columnTasks]) => (

                <Droppable
                  droppableId={columnId}
                  key={columnId}
                >

                  {(provided) => (

                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-200 rounded-xl p-4 min-h-[500px]"
                    >

                      <h2 className="text-2xl font-bold mb-4 dark:text-white">
                        {columnId}
                      </h2>


                      {columnTasks.map((task, index) => (

                        <Draggable
                          draggableId={task._id}
                          index={index}
                          key={task._id}
                        >

                          {(provided) => (

                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-xl shadow mb-4"
                            >

                              <h3 className="text-xl font-bold">
                                {task.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-300 mt-2">
                                {task.description}
                              </p>


                              <div className="mt-4 space-y-1">

                                <p>
                                  <span className="font-bold">
                                    Priority:
                                  </span>{" "}
                                  {task.priority}
                                </p>

                                <p>
                                  <span className="font-bold">
                                    Due:
                                  </span>{" "}
                                  {task.dueDate?.slice(0, 10)}
                                </p>

                              </div>

                            </div>

                          )}

                        </Draggable>

                      ))}

                      {provided.placeholder}

                    </div>

                  )}

                </Droppable>

              )
            )}

          </div>

        </DragDropContext>

      </div>

    </div>
  );
};

export default Tasks;
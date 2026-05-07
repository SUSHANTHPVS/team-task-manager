import Task from "../models/Task.js";


// CREATE TASK
export const createTask = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
    } = req.body;


    const task =
      await Task.create({

        title,
        description,
        priority,
        dueDate,
        assignedTo,
        project,

        createdBy: req.user._id,

      });


    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASKS
export const getTasks = async (
  req,
  res
) => {

  try {

    const tasks =
      await Task.find()

      .populate(
        "assignedTo",
        "name email"
      )

      .populate(
        "project",
        "name"
      );


    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
export const updateTaskStatus = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      );


    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }


    task.status =
      req.body.status ||
      task.status;


    const updatedTask =
      await task.save();


    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TASK
export const deleteTask = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      );


    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }


    await task.deleteOne();


    res.json({
      message:
        "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
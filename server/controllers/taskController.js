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
// GET TASKS
export const getTasks = async (
  req,
  res
) => {

  try {

    let tasks;

    // ADMIN → ALL TASKS
    if (req.user.role === "admin") {

      tasks = await Task.find()

        .populate(
          "assignedTo",
          "name email"
        )

        .populate(
          "project",
          "name"
        );
    }

    // MEMBER → ONLY ASSIGNED TASKS
    else {

      tasks = await Task.find({

        assignedTo: req.user._id,

      })

      .populate(
        "assignedTo",
        "name email"
      )

      .populate(
        "project",
        "name"
      );
    }

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

    // TASK NOT FOUND
    if (!task) {

      return res.status(404).json({

        message:
          "Task not found",

      });
    }


    // MEMBER CAN UPDATE ONLY OWN TASK
    if (

      req.user.role !== "admin" &&

      task.assignedTo.toString()
      !== req.user._id.toString()

    ) {

      return res.status(403).json({

        message:
          "Not authorized",

      });
    }


    // UPDATE STATUS
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
// EDIT TASK
export const editTask = async (
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

        message:
          "Task not found",

      });
    }

    // ADMIN ONLY
    if (req.user.role !== "admin") {

      return res.status(403).json({

        message:
          "Admin only",

      });
    }

    task.title =
      req.body.title ||
      task.title;

    task.description =
      req.body.description ||
      task.description;

    task.priority =
      req.body.priority ||
      task.priority;

    task.status =
      req.body.status ||
      task.status;

    task.dueDate =
      req.body.dueDate ||
      task.dueDate;

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
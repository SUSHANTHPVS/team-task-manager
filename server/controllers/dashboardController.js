import Task from "../models/Task.js";

export const getDashboardStats =
  async (req, res) => {

    try {

      const totalTasks =
        await Task.countDocuments();

      const completed =
        await Task.countDocuments({
          status: "Done",
        });

      const inProgress =
        await Task.countDocuments({
          status: "In Progress",
        });

      const overdue =
        await Task.countDocuments({

          dueDate: {
            $lt: new Date(),
          },

          status: {
            $ne: "Done",
          },

        });

      res.json({

        totalTasks,

        completed,

        inProgress,

        overdue,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
};
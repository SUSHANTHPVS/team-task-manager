import Project from "../models/Project.js";


// CREATE PROJECT
export const createProject =
async (req, res) => {

  try {

    const {
      name,
      description,
    } = req.body;

    const project =
      await Project.create({

        name,
        description,

        admin: req.user._id,

        members: [req.user._id],

      });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET PROJECTS
export const getProjects =
async (req, res) => {

  try {

    const projects =
      await Project.find({

        members: req.user._id,

      })

      .populate(
        "admin",
        "name email"
      )

      .populate(
        "members",
        "name email"
      );

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD MEMBER
export const addMember =
async (req, res) => {

  try {

    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {

      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ONLY ADMIN
    if (

      project.admin.toString()
      !== req.user._id.toString()

    ) {

      return res.status(403).json({
        message: "Admin only",
      });
    }

    // ADD USER
    project.members.push(
      req.body.userId
    );

    await project.save();

    res.json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
export const removeMember =
async (req, res) => {

  try {

    const project =
      await Project.findById(
        req.params.id
      );

    project.members =
      project.members.filter(

        (member) =>

          member.toString()
          !== req.body.userId

      );

    await project.save();

    res.json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
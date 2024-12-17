const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Import the Project model

// @route POST /api/projects
// @desc Create a new project
// @access Public

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from the database
    res.status(200).json(projects); // Respond with the projects
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    // Validate input
    if (!title || !description || !assignedTo) {
      return res.status(400).json({ message: "Title, Description, and AssignedTo are required" });
    }

    // Create a new project
    const newProject = new Project({
      title,
      description,
      assignedTo,
      status: status || "Pending", // Default to "Pending" if status is not provided
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject); // Send the saved project as a response
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

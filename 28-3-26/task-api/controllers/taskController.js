// controllers/taskController.js

const taskModel = require("../models/taskModel");

// CREATE Task
const createTask = (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = taskModel.createTask(title);
    res.status(201).json(newTask);
};

// GET All Tasks
const getAllTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();
    res.json(tasks);
};

// GET Single Task
const getTaskById = (req, res) => {
    const task = taskModel.getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
};

// UPDATE Task
const updateTask = (req, res) => {
    const { title, completed } = req.body;

    const updatedTask = taskModel.updateTask(req.params.id, { title, completed });

    if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
};

// DELETE Task
const deleteTask = (req, res) => {
    const wasDeleted = taskModel.deleteTask(req.params.id);

    if (!wasDeleted) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
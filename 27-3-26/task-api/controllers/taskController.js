const {
    getTasks,
    addTask,
    findTaskById,
    updateTaskInArray,
    deleteTaskById,
    getCurrentId,
    incrementId
} = require("../data/tasks");

// CREATE TASK
const createTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = {
        id: incrementId(),
        title,
        completed: false
    };

    addTask(newTask);
    res.status(201).json(newTask);
};

// GET ALL TASKS
const getAllTasks = (req, res) => {
    res.json(getTasks());
};

// GET SINGLE TASK
const getTaskById = (req, res) => {
    const task = findTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
};

// UPDATE TASK
const updateTask = (req, res) => {
    const task = findTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const updatedData = {};
    if (req.body.title !== undefined) updatedData.title = req.body.title;
    if (req.body.completed !== undefined) updatedData.completed = req.body.completed;

    updateTaskInArray(req.params.id, updatedData);

    res.json(task);
};

// DELETE TASK
const deleteTask = (req, res) => {
    const wasDeleted = deleteTaskById(req.params.id);

    if (!wasDeleted) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
};

module.exports = {
    createTask,
    getAllTasks,      // renamed for clarity
    getTaskById,
    updateTask,
    deleteTask
};
// models/taskModel.js

let tasks = [];
let currentId = 1;

// Get all tasks
const getAllTasks = () => tasks;

// Get task by ID
const getTaskById = (id) => tasks.find(t => t.id == id);

// Create a new task
const createTask = (title) => {
    const newTask = {
        id: currentId++,
        title,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};

// Update a task
const updateTask = (id, updateData) => {
    const task = tasks.find(t => t.id == id);
    if (!task) return null;

    if (updateData.title !== undefined) task.title = updateData.title;
    if (updateData.completed !== undefined) task.completed = updateData.completed;

    return task;
};

// Delete a task
const deleteTask = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id != id);
    return tasks.length < initialLength;  // true if deleted
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
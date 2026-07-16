// data/tasks.js
let tasks = [];
let currentId = 1;

const getTasks = () => tasks;
const getCurrentId = () => currentId;
const incrementId = () => currentId++;

const addTask = (task) => tasks.push(task);
const findTaskById = (id) => tasks.find(t => t.id == id);
const updateTaskInArray = (id, updatedData) => {
    const task = tasks.find(t => t.id == id);
    if (task) {
        Object.assign(task, updatedData);
    }
    return task;
};
const deleteTaskById = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id != id);
    return tasks.length < initialLength;   // returns true if something was deleted
};

module.exports = {
    getTasks,
    addTask,
    findTaskById,
    updateTaskInArray,
    deleteTaskById,
    getCurrentId,
    incrementId
};
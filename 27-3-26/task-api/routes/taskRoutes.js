const express = require("express");
const router = express.Router();

const {
    createTask,
    getAllTasks,      // ← changed here
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getAllTasks);        // ← changed here
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
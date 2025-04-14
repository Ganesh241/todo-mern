const express = require('express');
const { createTask, getUserTasks, updateTask, markTaskComplete, deleteTask,markTaskNotComplete } = require('../controllers/taskController');
const router = express.Router();

router.post('/create-task', createTask);
router.get('/user-tasks/:userId', getUserTasks);
router.put('/update-task/:taskId', updateTask);
router.put('/complete-task/:taskId', markTaskComplete);
router.put('/not-complete-task/:taskId', markTaskNotComplete);
router.delete('/delete-task/:taskId', deleteTask);

module.exports = router;
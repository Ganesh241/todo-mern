import axios from 'axios';

const api=axios.create({
    baseURL:'http://localhost:5005/api'
})


// Create a new task
export const createTask=(task)=>api.post('/tasks/create-task', task);

// Get tasks for a specific user
export const getUserTasks = (userId) => api.get(`/tasks/user-tasks/${userId}`);

// Update an existing task
export const updateTask = (taskId, task) => api.put(`/tasks/update-task/${taskId}`, task);

// Mark a task as complete
export const markTaskComplete = (taskId) => api.put(`/tasks/complete-task/${taskId}`);

export const markTaskNotComplete = (taskId) => api.put(`/tasks/not-complete-task/${taskId}`);

// Delete a task
export const deleteTask = (taskId) => api.delete(`/tasks/delete-task/${taskId}`);

export default {
    getUserTasks,
    createTask,
    updateTask,
    markTaskComplete,
    markTaskNotComplete,
    deleteTask,
};
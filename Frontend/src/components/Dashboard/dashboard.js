import React, { useEffect, useState } from 'react';
import { getUserTasks, createTask, updateTask, markTaskComplete, markTaskNotComplete, deleteTask } from '../../services/TaskService';
import './Dashboard.css';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [taskInput, setTaskInput] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
    // Store the original background style
    const originalBackground = document.body.style.background;
    // Set the gradient background when the component mounts
    document.body.style.background = 'linear-gradient(to right, #6a11cb, #396fce)';

    // Cleanup function to revert to the original background when the component unmounts
    return () => {
        document.body.style.background = originalBackground;
    };
    }, []);

    // Fetch tasks when component mounts
    const fetchTasks = async () => {
        if (user && user._id) {
            try {
                const response = await getUserTasks(user._id);
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleComplete = async (taskId) => {
        try {
            await markTaskComplete(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error marking task complete:', error);
        }
    };

    const handleNotComplete = async (taskId) => {
        try {
            await markTaskNotComplete(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error marking task as not complete:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleAddOrUpdate = async () => {
        if (taskInput.trim() === '') {
            alert('Task input cannot be empty');
            return;
        }
        try {
            const taskData = { Task: taskInput };

            // If editing an existing task, include the update timestamp
            if (editTaskId) {
                taskData.UpdatedAt = new Date().toISOString(); // Add update timestamp
                await updateTask(editTaskId, taskData);
            } else {
                await createTask({ userId: user._id, task: taskInput });
            }

            setTaskInput('');
            setEditTaskId(null);
            fetchTasks();
        } catch (error) {
            console.error('Error adding/updating task:', error);
        }
    };

    const handleEdit = (task) => {
        setTaskInput(task.Task);
        setEditTaskId(task._id);
    };

    const handleCheckboxChange = async (taskId, checked) => {
        if (checked) {
            await handleComplete(taskId);
        } else {
            await handleNotComplete(taskId);
        }
    };

    const handleLogout = () => {
        // Clear user from localStorage
        localStorage.removeItem('user');
        // Redirect to the login page
        navigate('/users/login');
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="task-input-area">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter a task"
                        className="task-input"
                    />
                    <button onClick={handleAddOrUpdate} className="task-button">
                        {editTaskId ? 'Update Task' : 'Add Task'}
                    </button>
                    {/* Logout Button */}
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
                {tasks.length === 0 ? (
                    <div className="no-tasks-message">No tasks found</div>
                ) : (
                    <div className="task-list">
                        {tasks.map((task) => (
                            <div className="task-card" key={task._id}>
                                <h4>{task.Task}</h4>
                                <p>Created: {new Date(task.CreatedAt).toLocaleString()}</p>
                                {task.UpdatedAt && <p>Updated: {new Date(task.UpdatedAt).toLocaleString()}</p>} {/* Show update time if available */}
                                <p
                                    className={task.Complete ? 'status-complete' : 'status-not-complete'}
                                >
                                    Status: {task.Complete ? 'Complete' : 'Not Complete'}
                                </p>
                                <div className="task-actions">
                                    <button onClick={() => handleEdit(task)} className="action-button edit">Edit</button>
                                    <input
                                        type="checkbox"
                                        checked={task.Complete}
                                        onChange={(e) => handleCheckboxChange(task._id, e.target.checked)}
                                        className="task-checkbox"
                                    />
                                    <button onClick={() => handleDelete(task._id)} className="action-button delete">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;

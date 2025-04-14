const Task = require('../models/taskModel');
const User=require('../models/userModel');

const createTask=async(req,res)=>{
    try{
        const {userId,task}=req.body;
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).send('User not found');
        }

        const newTask=new Task({Task:task,user:user._id});
        await newTask.save();

        user.tasks.push(newTask);
        await user.save();

        res.status(201).send(newTask);

    }catch(error){
        res.status(400).send(error);
    }
};

const getUserTasks = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('tasks');

        if(!userId){
            res.status(404).send('User not found')
        }

        res.status(200).send(user.tasks);
    } catch (error) {
        res.status(500).send("Server error");
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        // const { Task } = req.body;
        const { Task: taskData } = req.body;

        // Check if the task exists in the database
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return res.status(404).send('Task not found');
        }

        // Update the task
        existingTask.Task = taskData;
        existingTask.UpdatedAt = Date.now();
        const updatedTask = await existingTask.save();

        // Send the updated task
        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(400).send(error);
    }
};

const markTaskComplete = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        
        const task = await Task.findByIdAndUpdate(taskId, { Complete: true }, { new: true });
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

const markTaskNotComplete = async (req, res) => {
    // console.log('Route handler reached');
    const taskId = req.params.taskId;
    // console.log('Task ID:', taskId);
    try {
        const taskId = req.params.taskId;
        // console.log('task id is',taskId);
        const task = await Task.findByIdAndUpdate(taskId, { Complete: false }, { new: true });
        
        if (!task) {
            
            return res.status(404).send('Task not found');
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findByIdAndDelete(taskId);
        // Log the task ID and request body
        // console.log('Task ID:', taskId);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.status(200).send('Task deleted');
    } catch (error) {
        res.status(400).send("error occured");
    }
};

module.exports = { createTask, getUserTasks, updateTask, markTaskComplete, deleteTask,markTaskNotComplete };
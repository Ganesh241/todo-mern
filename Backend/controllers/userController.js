const User=require('../models/userModel');

const bcrypt = require('bcryptjs'); // Assuming you are using bcrypt for password hashing

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('All fields are required');
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        console.log(user.password);
        console.log(password);

        console.log('Stored password hash:', user.password);
        console.log('Entered password:', password);
        if (password!==user.password) {
            console.log('Password does not match');
            return res.status(400).send('Invalid email or password');
        }
        console.log('Login successful');
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send('Something happened');
    }
};

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        
        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).send('Email already exist');
        }

        const user=new User({name,email,password});
        await user.save();

        res.status(201).send(user);
    }catch(error){
        res.status(400).send("something happened");
    }
};

module.exports={register,login};
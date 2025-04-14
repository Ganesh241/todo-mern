const mongoose=require("mongoose");
const { type } = require("os");
const { boolean } = require("webidl-conversions");



const taskSchema=new mongoose.Schema({
    Task:{
        type:String,
        require:true
    },
    Complete:{
        type:Boolean,
        default:false
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatedAt:{
        type:Date,
        default:Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Task=mongoose.model('Task',taskSchema);


module.exports=Task;
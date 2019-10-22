const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todolist");//database
mongoose.set("debug",true);

mongoose.Promise = Promise;

var taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"Require"
    },
    isDone:{
        type:Boolean,
        default:false
    },
    createDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Task',taskSchema);
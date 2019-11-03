const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user:{
    type: String,
    required: true 
  },
  title: {
    type: String,
    required: true
  },
  details:{
    type: String
  },
  rewards: {
    type: Number,
    default: 100
  },
  punishment:{
    type: Number,
    default: 150
  },
  start_day:{
    type: Date,
    default: Date.now
  },
  due_day:{
    type: Date,
  },
  status:{
    type: String,
    default: "ongoing"
  },
  score:{
    type: Number,
    default: 0
  }
},{ collection : 'tasks' });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

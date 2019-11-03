
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const Task = require('../models/task');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// page to post a new task 
router.get('/post_task', ensureAuthenticated, (req, res) => res.render('post_task'));

// page to list all current tasks
router.get('/current_task', ensureAuthenticated, (req, res) => {
  const username = req.user.name
  Task.find({ user: username, status: 'ongoing'}).then(task => {
    if (task.length > 0) {
      res.render('current_task',{tasks:task})
    }else{
      res.send('<form action="/task_management" method="GET">empty list, you can enter some new tasks<input type="submit" value="return"/> </form>')
    }
  })


});

// page to list all history tasks 
router.get('/hist_task', ensureAuthenticated, (req, res) => {
  const username = req.user.name
  Task.find({ user: username }).then(task => {
    if (task.length > 0) {
      //console.log(task)
      res.render('hist_task',{tasks:task})
    }else{
      res.send('<form action="/task_management" method="GET">empty list, you can enter some new tasks<input type="submit" value="return"/> </form>')
    }
  })
});

// post_task
router.post('/post_task', (req, res) => {
  const { title, details, rewards,punishment,duration } = req.body;
  let errors = [];
  const username = req.user.name
  const start_day = new Date()
  const due_day = new Date()
  due_day.setDate(due_day.getDate() +  Number(duration))
  if (!title || !details || !rewards || !punishment || !duration) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('post_task', {
      errors,
      title,
      details,
      rewards,
      punishment,
      duration   
    });
  } else {
        const newTask = new Task({
            user:username,
            title:title,
            details:details,
            rewards:rewards,
            punishment:punishment,
            start_day:start_day,
            due_day:due_day           
        });

        newTask
          .save()
          .then(task => {
            req.flash(
              'success_msg',
              'You are now submit a new task'
            );
            res.redirect('/task_management');
          })
          .catch(err => console.log(err));;
    }
});


module.exports = router;


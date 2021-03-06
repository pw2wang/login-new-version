const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser= require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Test ejs
app.get('/test',(req, res) => {
  res.render('test')
})
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/chat', require('./routes/chat.js'));
app.use('/image', require('./routes/image.js'));
app.use('/map', require('./routes/map.js'));
app.use('/tasks', require('./routes/tasks.js'));

app.use('/task_management', require('./routes/task_management.js'));


const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

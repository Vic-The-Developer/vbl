const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


var bodyParser = require('body-parser');
// var config = require('./config/database');
var path = require('path');
// var passport = require('passport');
// var mongoose = require('mongoose');
const flash = require('connect-flash');
var cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5000"],
    credentials: true, 
    optionsSuccessStatus: 200,
    methods: "GET, PUT, DELETE, PATCH, POST"
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));


// View engine setup
app.set('views', path.join(__dirname, '/pages'));
app.set('view engine', 'ejs');

// Connect to db
// mongoose.connect(config.database);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('Connected to MongoDB')
// });

/**
 * Session management
 */
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
}));

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport);

app.use(flash());



// Set public folder
app.use('/', express.static('public/'));


//Set routes
const mainSite = require("./routes/main");

app.use("/", mainSite);




//Handle error 404
app.all('*', (req, res) => { 
    //res.render('main/404')
    res.send("No page found")
});



app.listen(PORT, ()=>{
    console.log(`Server is running and listening on port ${PORT}`);
})


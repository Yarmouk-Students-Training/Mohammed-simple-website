const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes')

// Express App
const app = express();

// Connection String
const dbURI = 'mongodb+srv://Mohammad:Mohammad12345@blogcluster.oo1zj.mongodb.net/BlogCluster?retryWrites=true&w=majority';
mongoose.connect(dbURI, { // Connect to the database.
    useNewUrlParser : true, 
    useUnifiedTopology: true
}).then((result)=>{app.listen(3000);}).catch((err)=>{console.log(err)});

// Set the view engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev')); 

app.get('/',(req,res) => { // Handle home page request.
    res.render('home',{ title : 'Home'});
});

app.get('/about',(req,res)=>{ // Handle About page request.
    res.render('about', { title: 'About' });
});

// Handle blog routes requests.
app.use('/blogs',blogRouter);

// 404 Page 
app.use((req,res)=>{
    res.status(404).render('404', { title:'404' });
});
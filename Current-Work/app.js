const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Express App
const app = express();

// Set the view engine
app.set('view engine', 'ejs');

// Listen for requests
app.listen(3000);

// Middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));

// Setup views.
app.get('/',(req,res)=>{
    const blogs = [
        {title:"The hello #1", snippet:"This is the Hello #1"},
        {title:"The hello #2", snippet:"MAGNESEUM"},
        {title:"The Hello #3", snippet:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, debitis!"},
    ];

    res.render('index',{ title:"Home", blogs });
});

app.get('/about',(req,res)=>{
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req,res)=>{
    res.render('createblog', { title: 'Create Blog' });
});

// 404 Page 
app.use((req,res)=>{
    res.status(404).render('404', { title:'404' });
});
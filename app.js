const { sequelize, user, post } = require('./models');
const express = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postsRouter');
app = express(); // init the express app
// Middlewares
app.use(express.json());
// view engine
app.set('view engine','text/html');

app.listen(3000, async () => {
    console.log("Server up on http://localhost:3000");
    await sequelize.sync();
    console.log("DB Synced");
});

app.get('/', (req,res)=>{ // Render home page 
    const ret = "<h1>Home Page</h1>";
    res.send(ret)
});
app.get('/register',(req,res)=>{ // Render register page
    const ret = "<h1>Register Page</h1>";
    res.send(ret);
});
app.post('/register', async(req,res) =>{ // Handle registeration requests
    try {
        const { username,password,email,first_name,last_name } = req.body;
        const User = await user.create({ username , password , email , first_name , last_name });
        console.log(User);
        return res.json(req.body);
    } catch (err) {
        console.log(err);
        return res.status(500).json(req.body);
    }
});
app.get('/login',(req,res)=>{ // Render login page
    const ret = "<h1>Login Page</h1>";
    res.send(ret);
});
app.post('/login',async(req,res)=>{ // Handle login requests
    try {
        const { username, password } = req.body;
        const User = await user.findOne({ username, password });
        return res.json(User);
    } catch (err){ 
        return res.status(500).json(req.body);
    }
});

app.use('/users', userRouter); // Handle user route requests

app.use('/posts',postRouter); // Handle post route requests

app.use((req,res)=>{ // 404
    ret = "<h1>404 not found.</h1>";
    return res.status(404).send(ret);
});
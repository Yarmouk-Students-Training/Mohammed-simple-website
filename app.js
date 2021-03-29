const { sequelize, user, auth_token } = require('./models');
const express = require('express');
const jwt = require('jsonwebtoken');
// Routers
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postsRouter');
const relationRouter = require('./routes/relationRouter');
const commentRouter = require('./routes/commentRouter');
const reactionRouter = require('./routes/reactionsRouter');

app = express(); // init the express app
// Middlewares
app.use(express.json());
// view engine
app.set('view engine','text/html');

app.listen(3000, async () => {
    console.log("Server up on http://localhost:3000");
    await sequelize.sync( /*{ force: true }*/ );
    console.log("DB Synced");
});

app.get('/', Verify_Token, (req,res)=>{ // Render home page 
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err) {
            console.log(err);
            return res.status(403).send("Authentication Error");
        } else {
            return res.send("<h1>Home Page</h1>");
        }
    });
});

app.get('/register',(req,res)=>{ // Render register page
    const ret = "<h1>Register Page</h1>";
    res.send(ret);
});

app.post('/register', async(req,res) =>{ // Handle registeration requests
    try {
        const { username,password,email,first_name,last_name } = req.body;
        const User = await user.create({ username , password , email , first_name , last_name });
        return res.json(User);
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
        if( User ){
            jwt.sign({ User }, 'secretkey' , async (err,token)=>{
                console.log(err);
                const user_id = User.dataValues.user_id;
                await auth_token.create( {  user_id , token } );
                return res.json({ token });
            }); 
        } else {
            return res.status(403).send("Unauthorized Access");
        }
    } catch (err){ 
        console.log(err);
        return res.status(500).send("Couldn't fetch user.");
    }
});

app.delete('/logout', async(req,res)=>{
    try {
        const { user_id } = req.body;
        const Result = await auth_token.destroy({
            where : { user_id }
        });
        console.log(Result)
        if(Result)
            return res.status(200).send("Successful logout.");
        else
            return res.status(200).send("Oops!. you have no token!");
    } catch (err){ 
        console.log(err);
        return res.status(500).send("Couldn't fetch user.");
    }
});


app.post('/test',Verify_Token,(req,res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err) {
            res.status(403).send("Authentication error.");
        } else {
            return res.json({
                string: "Testing", 
                authData
            });
        }
    });
});

app.use('/users', userRouter); // Handle user route requests

app.use('/posts',postRouter); // Handle post route requests

app.use('/relation',relationRouter); // Handle Relation route requests

app.use('/comments',commentRouter); // Handle Comment route requests

app.use('/reactions',reactionRouter); // Handle Reactions route requests

app.use((req,res)=>{ // 404
    const ret = "<h1>404 not found.</h1>";
    return res.status(404).send(ret);
});

// Verify the token.
function Verify_Token (req,res,next) {
    // Get Auth Header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // collecting the token from the bearer header
        const token = bearer[1]; 
        // add the token to the req object
        req.token = token; 
        next(); // call next middleware
    } else {
        res.status(403).send("Access denied.");
    }
}

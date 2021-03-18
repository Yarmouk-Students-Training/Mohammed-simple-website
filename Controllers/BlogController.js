const Blog = require('../Models/blog');

const blog_index = (req,res)=>{ // Handle index page requests.
    Blog.find().sort( {createdAt : -1 } ).then((blogs)=>{ 
        res.render('index',{ title:"Home" , blogs });
    }).catch((err)=>{
        console.log(err)
    });
}
const blog_details = (req,res)=>{ // Handle Specific blogs requests.
    const ID = req.params.id;
    Blog.findById(ID).then((result)=>{
        res.render('details', { blog: result, title: "Blog details"});
    }).catch((err)=>{
        console.log(err);
        res.status(404).render('404' , { title: "404" } ); // Render 404 if the blog is not found.
    });
}
const blog_create_get = (req,res)=>{ // Handle createblog requests.
    res.render('createblog', { title: 'Create Blog' });
}
const blog_create_post = (req,res)=>{ // Handle blog creation requests.
    const blog = new Blog(req.body);
    blog.save().then((result)=>{
        res.redirect('/blogs');
    }).catch((err)=>{
        console.log(err);
    });
}
const blog_delete = (req,res)=>{ // Handle blog deletion requests.
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then((result)=>{
        res.json({ redirect: '/blogs' });
    }).catch((err)=>{
        console.log(err);
    });
}
module.exports = { blog_index, blog_details, blog_create_get, blog_create_post, blog_delete};
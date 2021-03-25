const { post } = require('../models') 


const All_Posts = async(req,res)=>{
    try {
        const Posts = await post.findAll();
        return res.json(Posts);
    } catch (err) {
        const ret = "Couldn't find any posts.";
        console.log(err);
        return res.status(500).send(ret); 
    }
}

const New_Post = async(req,res)=>{
    try {
        const user_id = req.params.id;
        const content = req.body.content;
        const Post = await post.create({ user_id,content })
        return res.json(Post);
    } catch (err) {
        const ret = "Couldn't create new post";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Specific_Post = async(req,res)=>{
    try {
        const post_id = req.params.id;
        const Post = await post.findById(post_id);
        return res.json(Post);
    } catch ( err ) {
        const ret = "Couldn't find post.";
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Specific_User_Posts = async(req,res)=>{
    try {
        const user_id = req.params.id;
        const Posts = await post.findAll({ 
            where : { user_id } 
        });
        return res.json(Posts);
    } catch ( err ) {
        const ret = "Couldn't find any posts."
        console.log(err);
        return res.status(500).send(ret);
    }
}

const Delete_Post = async(req,res)=>{
    try {
        const post_id = req.params.id;
        await post.destroy({
            where : {
                post_id
            }
        });
        const ret = "Post deleted";
        return res.status(200).send(ret);
    } catch (err) {
        console.log(err);
        const ret = "Post not found";
        return res.status(500).send(ret);
    }
}

module.exports = {
    All_Posts,
    New_Post,
    Specific_Post,
    Specific_User_Posts,
    Delete_Post
}
const { post } = require('../models') 


const All_Posts = async(req,res)=>{ // All Posts
    try {
        const Posts = await post.findAll();
        console.log(typeof Posts);
        if( Posts.length != 0 )
            return res.json(Posts);
        else 
            return res.send("No posts, Create one :).");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't find any posts."); 
    }
}

const New_Post = async(req,res)=>{ // New Post
    try {
        const { user_id, content } = req.body;
        const Post = await post.create({ user_id , content })
        if( Post )
            return res.json(Post);
        else 
            return res.status(500).send("Couldn't create new post");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Couldn't create new post");
    }
}

const Specific_Post = async(req,res)=>{ // Specific Post
    try {
        console.log("Here");
        const { post_id } = req.body;
        const Post = await post.findAll({
            where: { post_id }
        });
        if( Post.length != 0 )
            return res.json(Post);
        else 
            return res.status(200).send("Couldn't find post.");
    } catch ( err ) {
        console.log(err);
        return res.status(500).send("Couldn't find post.");
    }
}

const Specific_User_Posts = async(req,res)=>{ // Specific User Posts
    try {
        const { user_id } = req.body;
        const Posts = await post.findAll({ 
            where : { user_id } 
        });
        if ( Posts.length != 0 )
            return res.json(Posts);
        else 
            return res.status(500).send("Couldn't find any posts.");
    } catch ( err ) {
        console.log(err);
        return res.status(500).send("Couldn't find any posts.");
    }
}

const Delete_Post = async(req,res)=>{ // Delete Specific Post
    try {
        const { post_id } = req.body;
        const Result = await post.destroy({
            where : {
                post_id
            }
        });
        if( Result )
            return res.status(200).send("Post deleted.");
        else 
            return res.status(200).send("Post not Found.");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Post not found");
    }
}

const Update_Post = async(req,res)=>{
    try {
        const { post_id, content } = req.body;
        const Result = post.update(
            { content }, {
                where : { post_id }
            });
        console.log(Result);
        if ( Result ) 
            return res.status(200).send("Post Updated Successfuly.");
        else
            return res.status(200).send("Post not Found.");
    } catch ( err ) {
        console.log(err);
        return res.status(200).send("Post not Found.");
    } 
}

module.exports = {
    All_Posts,
    New_Post,
    Specific_Post,
    Specific_User_Posts,
    Delete_Post,
    Update_Post
}